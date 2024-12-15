import React from "react";

const TimeSlotSelector = ({ timeSlots, selectedTime, onTimeSelect }) => {
  return (
    <div className="time-slots">
      {timeSlots.map((time) => (
        <button
          key={time}
          className={`time-slot ${selectedTime === time ? "selected" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            onTimeSelect(time);
          }}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimeSlotSelector;
