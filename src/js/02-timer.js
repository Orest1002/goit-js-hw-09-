import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix, { Notify } from 'notiflix';

 const btnStart = document.querySelector('[data-start]');
 const timeDays = document.querySelector('[data-days]');
 const timeHours = document.querySelector('[data-hours]');
 const timeMinutes = document.querySelector('[data-minutes]');
 const timeSeconds = document.querySelector('[data-seconds]');

 btnStart.disabled = true;
 let timerId = null;

  options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
   
    onClose(selectedDates) {
        const currentDate = new Date();
        if(selectedDates[0] - currentDate > 0){
            btnStart.disabled = false  
        }else{
            btnStart.disabled = true;  Notify.warning('Please choose a date in the future');
        };
    },
  };


function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  };
function addLeadingZero(value) {
    return String(value).padStart(2, 0); 
};


function timerStart() {
    const selectedDate = openDate.selectedDates[0];
  
    timerId = setInterval(() => {
      const startTime = new Date();
      const countdown = selectedDate - startTime;
      btnStart.disabled = true;
  
      if (countdown < 0) { Notify.failure('time is out');
        clearInterval(timerId);
       
        return;
      }
      updateTimerFace(convertMs(countdown));
    }, 1000);
  }

  function updateTimerFace({ days, hours, minutes, seconds }) {
    timeDays.textContent = addLeadingZero(days);
    timeHours.textContent = addLeadingZero(hours);
    timeMinutes.textContent = addLeadingZero(minutes);
    timeSeconds.textContent = addLeadingZero(seconds);
    
};
const openDate = flatpickr('#datetime-picker', options);

btnStart.addEventListener('click',timerStart );