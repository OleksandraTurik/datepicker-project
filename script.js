const modalWindow = document.getElementById('modal-window-id');
const inputField = document.getElementById('input-field');
const darkModeToggle = document.querySelector('.dark-mode-switch')
const yearsValue = document.getElementById('years_value')
const monthValue = document.getElementById('month_value')
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const imageId = document.getElementById('imageId')
const closeId = document.getElementById('closeId')
let days = null;

const clearActiveDay = () => {
    const activeDays = document.querySelector('.active');
    
    if (activeDays) activeDays.classList.remove('active');
}

inputField.addEventListener('mousedown', e => {
    modalWindow.classList.add('activeModal')
});

closeId.addEventListener('click', e => {
    modalWindow.classList.toggle('activeModal')
});

darkModeToggle.onclick = () => {
    document.querySelector('body').classList.toggle('light')
    document.querySelector('body').classList.toggle('dark')
}

const getDaysByMonth = (date) => {
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const dates = Array.from({ length: lastDay }, (el, i) => i + 1);
    return dates;
};

const currDate = new Date()

const generateCalendar = (date) => {
    const tableDaysContainer = modalWindow.querySelector('.table-days')
    const weekDays = [0, 1, 2, 3, 4, 5, 6];

    tableDaysContainer.innerHTML = ''
    
    const month = date.getMonth()
    const year = date.getFullYear()

    const firstDay = new Date(year, month, 1)
    const daysOfMonth = getDaysByMonth(date)
    const monthStartsOn = firstDay.getDay()
    let daysCount = 0;
    
    for (let i = 0; i < (daysOfMonth.length + weekDays[monthStartsOn]) / 7; i++) {
        const tableRow = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const tableDay = document.createElement('td');
            if (i === 0 && j < monthStartsOn) {
                tableDay.textContent = ''
            } else {
                tableDay.textContent = daysOfMonth[daysCount] ?? '' 
                daysCount++
            }
            tableRow.append(tableDay)
        }
        tableDaysContainer.append(tableRow);
    }
    
    days = document.querySelectorAll('td'); 
    days.forEach(item => {
        item.addEventListener('mousedown', e => {
            clearActiveDay()
            startMove(item);
            item.classList.add('active')
        });
        
        item.addEventListener('mouseup', e => {
            endMove();
        });
    })    
}

generateCalendar(currDate)

document.querySelector('#prev-year').onclick = () => {
    currDate.setFullYear(currDate.getFullYear() - 1)
    yearsValue.textContent = currDate.getFullYear()
    
    generateCalendar(currDate)
}

document.querySelector('#next-year').onclick = () => {
    currDate.setFullYear(currDate.getFullYear() + 1)
    yearsValue.textContent = currDate.getFullYear()
    
    generateCalendar(currDate)
}

document.querySelector('#prev-month').onclick = () => {
    const prevMonth = new Date(
        currDate.getFullYear(),
        currDate.getMonth() - 1,
        currDate.getDate()
    )

    currDate.setMonth(currDate.getMonth() - 1)
    
    monthValue.textContent = monthNames[prevMonth.getMonth()]
    yearsValue.textContent = prevMonth.getFullYear()
    
    changeImageSrc(monthNames[prevMonth.getMonth()])
    generateCalendar(currDate)
}

document.querySelector('#next-month').onclick = () => {
    const nextMonth = new Date(
        currDate.getFullYear(),
        currDate.getMonth() + 1,
        currDate.getDate()
    )

    currDate.setMonth(currDate.getMonth() + 1)
    monthValue.textContent = monthNames[nextMonth.getMonth()]
    yearsValue.textContent = nextMonth.getFullYear()
    
    changeImageSrc(monthNames[nextMonth.getMonth()])
    generateCalendar(currDate)
}

const changeImageSrc = (mounthName) => {
    imageId.src = "img/" + mounthName + ".jpg";
}

const activateDay = () => {
    const activeElement = document.activeElement;
    const activeAItem = document.querySelector('.active-a');
    const activeBItem = document.querySelector('.active-b');
    
    if (activeAItem && activeBItem) {
      clearActiveDays();
      clearRange();
      activeElement.classList.add('active-a');
      return;
    }
    
    if (activeAItem) activeElement.classList.add('active-b');
    else activeElement.classList.add('active-a');
}
  
const clearActiveDays = () => {
    let activeAItem = document.querySelector('.active-a');
    let activeBItem = document.querySelector('.active-b');
    
    if (activeAItem) activeAItem.classList.remove('active-a');
    if (activeBItem) activeBItem.classList.remove('active-b');
}
  
const clearRange = () => {
    days.forEach(item => {
      item.classList.remove('range');
    });
}
  
const calculateRange = () => {
    let activeAIndex, activeBIndex;
  
    days.forEach((item, index) => {
      if (item.classList.contains('active-a')) activeAIndex = index;
      if (item.classList.contains('active-b')) activeBIndex = index;
    });
  
    if (activeAIndex < activeBIndex) {
      for (let i = activeAIndex; i <= activeBIndex; i++) {
        days[i].classList.add('range');
      }
    }
  
    if (activeAIndex > activeBIndex) {
      for (let i = activeAIndex; i >= activeBIndex; i--) {
        days[i].classList.add('range');
      }
    }
}
  
const startMove = (item) => {
    dragging = true;
    
    let activeAItem = document.querySelector('.active-a');
    let activeBItem = document.querySelector('.active-b');
    
    if (!activeBItem && activeAItem) {
      item.classList.add('active-b');
      calculateRange();
    } else {
      clearActiveDays();
      clearRange();
      item.classList.add('active-a');
    }
}
  
const endMove = () =>  {
    dragging = false;
}