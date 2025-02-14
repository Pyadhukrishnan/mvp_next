import { formatDateToYYYYMMDD } from '@/utils/date-formatter-util';
import React, { useState, useRef, useEffect } from 'react';

interface DatePickerProps {
  mode?: 'single' | 'range';
  onChange: (dates: Date| null) => void;
  initialYear?: number;
  yearRange?: number; // How many years before and after the initial year
}

const DatePicker: React.FC<DatePickerProps> = ({ 
  mode = 'single', 
  onChange,
  initialYear = 2026,
  yearRange = 50  // Default to 50 years before and after
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(initialYear, new Date().getMonth(), 1));
  const [selecting, setSelecting] = useState('start');
  const [showYearPicker, setShowYearPicker] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const generateYears = () => {
    // Generate years both before and after the initial year
    const years: number[] = [];
    for (let i = initialYear - yearRange; i <= initialYear + yearRange; i++) {
      years.push(i);
    }
    return years.sort((a, b) => b - a); // Sort in descending order
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowYearPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mode === 'single' && selectedDate) {
      onChange(selectedDate);
    } else if (mode === 'range' && startDate && endDate) {
      // set date range
    }
  }, [selectedDate, startDate, endDate, mode, onChange]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const handleDateClick = (date: Date) => {
    if (mode === 'single') {
      setSelectedDate(date);
      setIsOpen(false);
    } else {
      if (selecting === 'start') {
        setStartDate(date);
        setSelecting('end');
        if (endDate && date > endDate) {
          setEndDate(null);
        }
      } else {
        if (date >= startDate!) {
          setEndDate(date);
          setSelecting('start');
          setIsOpen(false);
        } else {
          setStartDate(date);
        }
      }
    }
  };

  const handleYearChange = (year: number) => {
    const currentMonthIndex = currentMonth.getMonth();
    const newDate = new Date(year, currentMonthIndex, 1);
    setCurrentMonth(newDate);
    setShowYearPicker(false);
  };

  const isDateInRange = (date: Date) => {
    if (mode === 'single') return false;
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isSelectedDate = (date: Date) => {
    if (mode === 'single') {
      return selectedDate && date.toDateString() === selectedDate.toDateString();
    }
    return false;
  };

  const isStartDate = (date: Date) => {
    if (mode === 'range') {
      return startDate && date.toDateString() === startDate.toDateString();
    }
    return false;
  };

  const isEndDate = (date: Date) => {
    if (mode === 'range') {
      return endDate && date.toDateString() === endDate.toDateString();
    }
    return false;
  };

  const changeMonth = (delta: number) => {
    const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + delta));
    setCurrentMonth(new Date(newMonth));
  };

  const formatDate = (date: Date) => {
    if (!date) return '';
    return formatDateToYYYYMMDD(date);
  };

  const getInputValue = () => {
    if (mode === 'single') {
      return selectedDate ? formatDate(selectedDate) : '';
    } else {
      return startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : '';
    }
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
    const days = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isInRange = isDateInRange(date);
      const isSelected = isSelectedDate(date);
      const isStart = isStartDate(date);
      const isEnd = isEndDate(date);

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(date)}
          className={`calendar-day 
            ${isInRange ? 'in-range' : ''} 
            ${isSelected ? 'selected' : ''}
            ${isStart ? 'start-date' : ''} 
            ${isEnd ? 'end-date' : ''}`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="date-picker-container" ref={calendarRef}>
      <div
       className={`date-input ${isOpen?"active":null}` }
       onClick={() => setIsOpen(!isOpen)}
       >
      <input
        type="text"
        value={getInputValue()}
        placeholder={mode === 'single' ? "YYYY/MM/DD" : "YYYY/MM/DD - YYYY/MM/DD"}
        readOnly
        
      />
      <span><img src="/icons/arrow.svg" alt="" className={`${isOpen?"rotate":null}`} /></span>

      </div>
      
      {isOpen && (
        <div className="calendar">
          <div className="calendar-header">
            <button onClick={() => changeMonth(-1)}>&lt;</button>
            <div className="month-year-selector">
              <span>{months[currentMonth.getMonth()]}</span>
              <button 
                className="year-button"
                onClick={() => setShowYearPicker(!showYearPicker)}
              >
                {currentMonth.getFullYear()}
              </button>
            </div>
            <button onClick={() => changeMonth(1)}>&gt;</button>
          </div>
          
          {showYearPicker ? (
            <div className="year-picker">
              {generateYears().map(year => (
                <div
                  key={year}
                  onClick={() => handleYearChange(year)}
                  className={`year-option ${year === currentMonth.getFullYear() ? 'selected-year' : ''}`}
                >
                  {year}
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="calendar-days">
                {days.map(day => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </div>
              <div className="calendar-grid">
                {renderCalendar()}
              </div>
            </>
          )}
        </div>
      )}
      
      <style>{`
        .date-picker-container {
          position: relative;
          width: 300px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
        }

        .date-input {
          width: 100%;
          padding: 8px;
          background-color: #fff;
          border: 1px solid #e8e9ea;
          border-radius: 2px;
          transition: all 0.4s;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 170px;
          max-width: 170px;
        }

        .active {
          border-color: var(--primary-font-color-1);
          box-shadow: 0 0 5px rgba(2, 35, 69, 0.5);
        }

        .date-input input{
          width: 106px;
          border: none;
          background-color: transparent;
          outline: none;
        }

        .calendar {
          position: absolute;
          top: 100%;
          left: 0;
          width: 300px;
          border-radius: 4px;
          background: white;
          border-color: var(--primary-font-color-1);
          box-shadow: 0 0 5px rgba(2, 35, 69, 0.5);
          margin-top: 4px;
          z-index: 1000;
        }

        .calender-grid{
          gap:10px;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          border-bottom: 1px solid #eee;
        }

        .calendar-header button{
          border: none;
          background-color: transparent;
          cursor: pointer;
          outline: none;
          transition: all 0.4s ease;
        }


        .rotate{
          transform: rotate(180deg);
        }

        

        .month-year-selector {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .year-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 2px 8px;
          color: var(--primary-font-color-1);
          font-weight: 500;
          font-size: 14px;
        }

        .year-button:hover {
          background-color: #f0f0f0;
          border-radius: 4px;
        }

        .year-picker {
          max-height: 250px;
          overflow-y: auto;
          scrollbar-width: thin;
          padding: 8px 0;
        }

        .year-picker::-webkit-scrollbar {
          width: 6px;
        }

        .year-picker::-webkit-scrollbar-thumb {
          background-color: #ccc;
          border-radius: 3px;
        }

        .year-option {
          padding: 6px 16px;
          cursor: pointer;
          text-align: center;
          font-size: 14px;
          transition: background-color 0.2s;
        }

        .year-option:hover {
          background-color: #f0f0f0;
        }

        .selected-year {
          background-color: var(--primary-font-color-1);
          color: white;
          font-weight: 500;
        }

        .calendar-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          padding: 8px;
          border-bottom: 1px solid #eee;
        }

        .weekday {
          text-align: center;
          font-size: 12px;
          color: #666;
          padding: 4px;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          padding: 8px;
        }

        .calendar-day {
          text-align: center;
          padding: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .calendar-day:hover {
          background-color: #f0f0f0;
        }

        .calendar-day.empty {
          cursor: default;
        }

        .calendar-day.in-range {
          background-color: #e6f3ff;
        }

        .calendar-day.selected,
        .calendar-day.start-date,
        .calendar-day.end-date {
          background-color: var(--primary-font-color-1);
          color: white;
        }

        .calendar-day.selected {
          border-radius: 8px;
        }

        .calendar-day.start-date {
          border-top-left-radius: 50%;
          border-bottom-left-radius: 50%;
        }

        .calendar-day.end-date {
          border-top-right-radius: 50%;
          border-bottom-right-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default DatePicker;