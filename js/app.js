+function() {
    
    const clock = {
    
        pointers: {
            hour: document.querySelector(".pointer-hour"),
            minute: document.querySelector(".pointer-minute"),
            second: document.querySelector(".pointer-second")
        },
    
        conversion: {
            secondsPerMinute: 60,
            secondsPerHour: 60 * 60,
            secondsPerDay: 60 * 60 * 24
        },
    };
    
    const degPerSecond = {
        hour: 360 / (clock.conversion.secondsPerDay / 2),
        minute: 360 / clock.conversion.secondsPerHour,
        second: 360 / clock.conversion.secondsPerMinute
    };
    
    const getCurrentTime = () => {
        const today = new Date();
        const time = {
            hour: today.getHours(),
            minute: today.getMinutes(),
            second: today.getSeconds()
        }
    
        return time;
    }
    
    const setPointersPosition = () => {
        const currentTime = getCurrentTime();
        const pointersPosition = {
            hour: (currentTime.hour * clock.conversion.secondsPerHour + currentTime.minute * clock.conversion.secondsPerMinute) * degPerSecond.hour,
            minute: currentTime.minute * clock.conversion.secondsPerMinute * degPerSecond.minute,
            second: currentTime.second * degPerSecond.second
        };
    
        Object.keys(currentTime).forEach(unit => {
            const pointerDeg = pointersPosition[unit];
            clock.pointers[unit].style.transform = `rotate(${pointerDeg}deg)`;
        });
    
        return pointersPosition;
    };
    
    const initPointersPosition = setPointersPosition();
    
    window.setInterval(() => {
        Object.keys(initPointersPosition).forEach(unit => {
            initPointersPosition[unit] += degPerSecond[unit];
            clock.pointers[unit].style.transform = `rotate(${initPointersPosition[unit]}deg)`;
        });
    }, 1000);

}();