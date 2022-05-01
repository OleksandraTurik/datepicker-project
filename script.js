const modalWindow = document.getElementById('modal-window-id');
const inputField = document.getElementById('input-field');
const darkModeToggle = document.querySelector('.dark-mode-switch')
const yearsValue = document.getElementById('years_value')
const monthValue = document.getElementById('month_value')
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const imageId = document.getElementById('imageId')

const clearActiveDays = () => {
    const activeDays = document.querySelector('.active');
    
    if (activeDays) activeDays.classList.remove('active');
}

inputField.addEventListener('mousedown', e => {
    modalWindow.classList.add('activeModal')
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
    
    document.querySelectorAll('td').forEach(item => {
        item.addEventListener('mousedown', e => {
            clearActiveDays()
            item.classList.add('active')
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
