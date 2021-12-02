let myField = document.querySelector('.main__myField')
let myCells = myField.children
let eyeBtn = document.querySelector('.main__btnHide')


myField.addEventListener('click', secondShip)

myField.addEventListener('mouseover', function(event) {
    if(event.target.tagName !== 'TD') return;
    const elem = event.target
    const columnCells = [...elem.parentElement.parentElement.children]
    columnCells.map(item => {
        const arrTd = [...item.children]
        arrTd.map(item => {
            if(item.cellIndex === elem.cellIndex) {
                item.classList.add('cellHover')
            }
        })
    })
    const rowCells = [...elem.parentNode.children]
    rowCells.map(item => item.classList.add('cellHover'))
})

myField.addEventListener('mouseout', function(e, remove) {
    highLight(e, remove)
})

function highLight(e, method) {
    let m = `${method('cellHover')}`
    console.log(m)
    if(e.target.tagName !== 'TD') return;
    const elem = e.target
    const columnCells = [...elem.parentElement.parentElement.children]
    columnCells.map(item => {
        const arrTd = [...item.children]
        arrTd.map(item => {
            if(item.cellIndex === elem.cellIndex) {
                console.log(item.classList.remove('cellHover'))
            }
        })
    })
    const rowCells = [...elem.parentNode.children]
    rowCells.map(item => item.classList.remove('cellHover'))
}

function fourthShip(e) {
    if(e.target.tagName !== 'TD') return;

    const elem = e.target,
          elemRow = elem.parentElement.rowIndex,
          elemColumn = elem.cellIndex

    if(elemColumn < 7) {
        for(i = 0; i <= 3; i++) {
            myField.rows[elemRow].cells[elemColumn + i].classList.add('cellBg')
            console.log(myField.rows[elemRow].cells[elemColumn + i])
        }
    }
}

function thirdShip(e) {
    if(e.target.tagName !== 'TD') return;

    const elem = e.target,
          elemRow = elem.parentElement.rowIndex,
          elemColumn = elem.cellIndex

    if(elemColumn < 8) {
        for(i = 0; i <= 2; i++) {
            myField.rows[elemRow].cells[elemColumn + i].classList.add('cellBg')
            console.log(myField.rows[elemRow].cells[elemColumn + i])
        }
    }
}

function secondShip(e) {
    if(e.target.tagName !== 'TD') return;
    // if(e.target.classList)
    const elem = e.target,
          elemRow = elem.parentElement.rowIndex,
          elemColumn = elem.cellIndex

    if(elemColumn < 9) {
        for(i = 0; i <= 1; i++) {
            myField.rows[elemRow].cells[elemColumn + i].classList.add('cellBg')
            console.log(myField.rows[elemRow].cells[elemColumn + i])
        }
    }
}




