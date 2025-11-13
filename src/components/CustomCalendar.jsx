import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";

const CustomCalendar = React.memo(({ selectedDate, onDateSelect, serviceName, disabledDates = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableDates, setAvailableDates] = useState(new Set());
  const [loadingDates, setLoadingDates] = useState(new Set());
  const [unavailableDates, setUnavailableDates] = useState(new Set());
  const checkedDatesRef = useRef(new Set());
  const isMountedRef = useRef(true);
  const timeoutIdsRef = useRef(new Set());
  const abortControllerRef = useRef(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get first day of month and number of days
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { firstDay, lastDay, daysInMonth, startingDayOfWeek };
  };

  // Check if a date has available slots - memoized without state dependencies
  const checkDateAvailability = React.useCallback(async (dateStr, isMountedRef) => {
    if (!serviceName) return false;
    
    // Skip if already checked
    if (checkedDatesRef.current.has(dateStr)) {
      return false; // Will be determined by state
    }

    checkedDatesRef.current.add(dateStr);
    
    // Only update state if component is still mounted
    if (isMountedRef.current) {
      setLoadingDates(prev => new Set(prev).add(dateStr));
    }

    try {
      // Use abort controller if available
      const config = abortControllerRef.current 
        ? { signal: abortControllerRef.current.signal }
        : {};
        
      const response = await axiosInstance.get(
        `/book/availability?date=${dateStr}&service_name=${encodeURIComponent(serviceName)}`,
        config
      );
      
      // Check if component is still mounted before updating state
      if (!isMountedRef.current) return false;
      
      const hasSlots = response.data.slots && response.data.slots.length > 0;
      
      if (hasSlots) {
        setAvailableDates(prev => new Set(prev).add(dateStr));
        setUnavailableDates(prev => {
          const newSet = new Set(prev);
          newSet.delete(dateStr);
          return newSet;
        });
      } else {
        setUnavailableDates(prev => new Set(prev).add(dateStr));
        setAvailableDates(prev => {
          const newSet = new Set(prev);
          newSet.delete(dateStr);
          return newSet;
        });
      }
      
      return hasSlots;
    } catch (error) {
      // Ignore abort errors
      if (error.name === 'AbortError' || error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
        return false;
      }
      
      // Only log if component is mounted
      if (isMountedRef.current) {
        console.error(`Error checking availability for ${dateStr}:`, error);
        setUnavailableDates(prev => new Set(prev).add(dateStr));
      }
      return false;
    } finally {
      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setLoadingDates(prev => {
          const newSet = new Set(prev);
          newSet.delete(dateStr);
          return newSet;
        });
      }
    }
  }, [serviceName]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      // Clear all pending timeouts
      timeoutIdsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
      timeoutIdsRef.current.clear();
      // Abort any pending requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Format date in local timezone to avoid UTC conversion issues
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Memoize disabledDates string to prevent unnecessary recalculations
  const disabledDatesStr = useMemo(() => {
    return JSON.stringify([...disabledDates].sort());
  }, [disabledDates]);

  // Memoize dates to check to prevent unnecessary recalculations
  const datesToCheck = useMemo(() => {
    if (!serviceName) return [];
    
    const { daysInMonth } = getDaysInMonth(currentMonth);
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dates = [];
    const disabledSet = new Set(disabledDates);
    
    // Check all future dates in the month (not just first 15)
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);
      
      // Skip past dates
      if (date < today) continue;
      
      // Skip if already disabled
      const dateStr = formatDate(date);
      if (disabledSet.has(dateStr)) continue;
      
      dates.push(dateStr);
    }
    
    return dates;
  }, [currentMonth, serviceName, disabledDatesStr]);

  // Track previous values to prevent unnecessary state updates
  const prevDatesToCheckRef = useRef('');
  const prevServiceNameRef = useRef('');

  // Check availability for all dates in current month view
  useEffect(() => {
    const datesToCheckStr = JSON.stringify(datesToCheck);
    const hasChanged = datesToCheckStr !== prevDatesToCheckRef.current || serviceName !== prevServiceNameRef.current;
    
    if (!hasChanged) return;

    // Update refs
    prevDatesToCheckRef.current = datesToCheckStr;
    prevServiceNameRef.current = serviceName || '';

    if (!serviceName || datesToCheck.length === 0) {
      // Only update state if values actually changed
      setAvailableDates(prev => prev.size > 0 ? new Set() : prev);
      setUnavailableDates(prev => prev.size > 0 ? new Set() : prev);
      setLoadingDates(prev => prev.size > 0 ? new Set() : prev);
      return;
    }

    // Abort previous requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    // Clear all previous timeouts
    timeoutIdsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutIdsRef.current.clear();

    // Clear checked dates when month or service changes
    checkedDatesRef.current.clear();
    setAvailableDates(new Set());
    setUnavailableDates(new Set());
    setLoadingDates(new Set());

    // Batch check dates with debouncing - limit concurrent requests
    const maxConcurrent = 5; // Check 5 dates at a time
    datesToCheck.forEach((dateStr, index) => {
      // Stagger requests to avoid overwhelming server
      // Group requests in batches of maxConcurrent
      const batchIndex = Math.floor(index / maxConcurrent);
      const delay = batchIndex * 200 + (index % maxConcurrent) * 100;
      
      const timeoutId = setTimeout(() => {
        if (isMountedRef.current && abortControllerRef.current && !abortControllerRef.current.signal.aborted) {
          checkDateAvailability(dateStr, isMountedRef);
          timeoutIdsRef.current.delete(timeoutId);
        }
      }, delay);
      
      timeoutIdsRef.current.add(timeoutId);
    });

    // Cleanup function
    return () => {
      // Clear all timeouts when effect re-runs or component unmounts
      timeoutIdsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
      timeoutIdsRef.current.clear();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [datesToCheck, serviceName]);

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isSelected = (date) => {
    if (!selectedDate) return false;
    // selectedDate is a string in YYYY-MM-DD format
    const dateStr = formatDate(date);
    return dateStr === selectedDate;
  };

  const handleDateClick = async (date) => {
    if (isPast(date)) return;
    
    const dateStr = formatDate(date);
    if (disabledDates.includes(dateStr)) return;

    // If already marked as unavailable (no slots at all), don't allow selection
    if (unavailableDates.has(dateStr)) {
      return;
    }

    // If already available, select it immediately
    if (availableDates.has(dateStr)) {
      onDateSelect(dateStr);
      return;
    }

    // Allow optimistic selection - select the date immediately if it's loading
    // The time slots will be fetched and displayed, and if there are no slots,
    // the user will see that in the time selection area
    if (loadingDates.has(dateStr)) {
      // Still allow selection - we'll check availability and show times
      onDateSelect(dateStr);
      return;
    }

    // If not checked yet, allow selection and check in background
    // This allows users to select dates even if they have some appointments
    onDateSelect(dateStr);
    
    // Check availability in background to update visual indicators
    checkDateAvailability(dateStr, isMountedRef);
  };

  const navigateMonth = useCallback((direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  }, []);

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Create array of days to display
  const days = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-[#e6dede]/50 rounded-3xl p-6 shadow-xl">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          onClick={() => navigateMonth(-1)}
          className="p-2 rounded-full hover:bg-[#e8dbc9]/20 transition-colors text-[#6b4b3e]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronLeft />
        </motion.button>
        
        <h3 className="text-xl md:text-2xl font-[Soligant] text-[#3e2e3d] flex items-center gap-2">
          <FaCalendarAlt className="text-[#6b4b3e]" />
          {months[month]} {year}
        </h3>
        
        <motion.button
          onClick={() => navigateMonth(1)}
          className="p-2 rounded-full hover:bg-[#e8dbc9]/20 transition-colors text-[#6b4b3e]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronRight />
        </motion.button>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-[#77625a] py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((date, idx) => {
          if (!date) {
            return <div key={`empty-${idx}`} className="aspect-square" />;
          }

          const dateStr = formatDate(date);
          const past = isPast(date);
          const today = isToday(date);
          const selected = isSelected(date);
          const disabled = disabledDates.includes(dateStr);
          const unavailable = unavailableDates.has(dateStr);
          const available = availableDates.has(dateStr);
          const loading = loadingDates.has(dateStr);
          // Allow clicking on any future date that's not disabled
          // Only mark as unavailable after we've checked and confirmed no slots
          // Optimistic: allow clicking even if not checked yet
          const clickable = !past && !disabled;

          return (
            <motion.button
              key={dateStr}
              onClick={() => handleDateClick(date)}
              disabled={!clickable}
              className={`
                aspect-square rounded-xl text-sm font-medium transition-all relative
                ${past || disabled
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                  : unavailable
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                  : selected
                  ? "bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a] text-white shadow-lg scale-105 cursor-pointer"
                  : available
                  ? "bg-white border-2 border-[#e8dbc9] text-[#3e2e3d] hover:border-[#6b4b3e] hover:bg-[#e8dbc9]/20 hover:scale-105 cursor-pointer"
                  : loading
                  ? "bg-[#e8dbc9]/30 border border-[#e8dbc9] text-[#77625a] cursor-pointer"
                  : "bg-white border-2 border-[#e8dbc9]/50 text-[#3e2e3d] hover:border-[#6b4b3e] hover:bg-[#e8dbc9]/20 hover:scale-105 cursor-pointer"
                }
                ${today && !selected ? "ring-2 ring-[#6b4b3e] ring-offset-2" : ""}
              `}
              whileHover={clickable ? { scale: 1.05 } : {}}
              whileTap={clickable ? { scale: 0.95 } : {}}
            >
              {date.getDate()}
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-[#6b4b3e] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {available && !selected && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#5a7d5a] rounded-full" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-[#e6dede]/50 flex flex-wrap gap-4 text-xs text-[#5f4b5a]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-xl bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a]"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-xl bg-white border-2 border-[#e8dbc9] relative">
            <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#5a7d5a] rounded-full"></div>
          </div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-xl bg-gray-100"></div>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
});

CustomCalendar.displayName = 'CustomCalendar';

export default CustomCalendar;

