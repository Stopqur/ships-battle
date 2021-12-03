let myField = document.querySelector('.main__myField')
let cancelBtn = document.querySelector('.main__ships-cancel-btn')
let eyeBtn = document.querySelector('.main__btnHide')
let typeShipInputs = document.querySelectorAll('.main__ships-type-input')
let outputType = document.querySelector('.output')

let shipTypeValue
let ships = {
    monoShips: [],
    doubleShips: [],
    tripleShips: [],
    quadroShips: [],
    blockCeils: []
}

hiddenCells()

myField.addEventListener('click', switchTypeShip)

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

myField.addEventListener('mouseout', function(event) {
    if(event.target.tagName !== 'TD') return;
    const elem = event.target
    const columnCells = [...elem.parentElement.parentElement.children]
    columnCells.map(item => {
        const arrTd = [...item.children]
        arrTd.map(item => {
            if(item.cellIndex === elem.cellIndex) {
                item.classList.remove('cellHover')
            }
        })
    })
    const rowCells = [...elem.parentNode.children]
    rowCells.map(item => item.classList.remove('cellHover'))
})


cancelBtn.addEventListener('click', () => {
    for(let [type, arrShips] of Object.entries(ships)) {
        for(ship of arrShips) {
            if(type === 'blockCeils') {
                if(!ship.classList.contains('cellHidden')) {
                    ship.className = ''
                }
            } else {
                arrShips = ship.map(item => {
                    item.className = ''
                    return item
                })   
            }  
        }       
        arrShips = []
    }
})

function switchTypeShip(event) {
    for(item of typeShipInputs) {
        if (item.checked) {
            shipTypeValue = item.value
        }
    }
    switch (shipTypeValue) {
        case '1':
            setMono(event)
            break;
        case '2':
            setDouble(event)
            break;
        case '3':
            setTriple(event)
            break;
        case '4':
            setQuadro(event)
            break;
        
    }
}

function hiddenCells() {
    for(let i = 0; i < 12; i++) {
        myField.rows[0].cells[i].classList.add('cellHidden')
        myField.rows[11].cells[i].classList.add('cellHidden')
        myField.rows[i].cells[0].classList.add('cellHidden')
        myField.rows[i].cells[11].classList.add('cellHidden')
        ships.blockCeils = [...ships.blockCeils, myField.rows[0].cells[i], myField.rows[11].cells[i], myField.rows[i].cells[0], myField.rows[i].cells[11]]
    }
}

//Setting ships on the field
function setMono(e) {
    setHorizontalShip(e, 1)
}

function setDouble(e) {
    setHorizontalShip(e, 2)
}

function setTriple(e) {
    setHorizontalShip(e, 3)
}

function setQuadro(e) {
    setHorizontalShip(e, 4)
}

function setHorizontalShip(e, typeShip) {
    if(e.target.tagName !== 'TD') return;
    if(e.target.classList.contains('blockCells')) return;

    let shipLength = typeShip
    const elem = e.target,
          elemRow = elem.parentElement.rowIndex,
          elemColumn = elem.cellIndex
    if(elemRow === 0 || elemColumn === 0 || elemRow === 11 || elemColumn === 11) {
        console.log('установка запрещена')
    } else {
        switch (typeShip) {
            case 1:
                currentArrShips = ships.monoShips
                break;
            case 2:
                currentArrShips = ships.doubleShips
                break;
            case 3:
                currentArrShips = ships.tripleShips
                break;
            case 4:
                currentArrShips = ships.quadroShips
                break;    
        }
        
        if(!elem.classList.contains('cellShipBg') && elemColumn <= 11 - shipLength) {
            if(shipLength === 1 
               || (!myField.rows[elemRow].cells[elemColumn + typeShip].classList.contains('cellShipBg'))) 
            {
                let cellShip = []
                let flag
                for(i = 0; i <= shipLength - 1; i++) {
                    if(!myField.rows[elemRow].cells[elemColumn + shipLength - 1].classList.contains('blockCells')) {
                        myField.rows[elemRow].cells[elemColumn + i].classList.add('cellShipBg')
                        cellShip.push(myField.rows[elemRow].cells[elemColumn + i])
                        flag = true
                    } else {
                        flag = false
                    }
                }
                if (flag) {
                    borderShip(elemRow, elemColumn, shipLength)
                    currentArrShips.push(cellShip)
                }
    
            } else {
                alert('Невозможно установить')
            }         
        }

    }
     
}


function borderShip(row, column, type) {
    let leftCell = myField.rows[row].cells[column - 1]
    let topCell = myField.rows[row - 1] 
    let bottomCell = myField.rows[row + 1]
    let rightCell = myField.rows[row].cells[column + 1]
    
    //corners
    // if (row === 0 && column === 0) {
    //     bottomCell.cells[column].classList.add('blockCells')
    //     rightCell.classList.add('blockCells')
    //     ships.blockCeils = [...ships.blockCeils, rightCell, bottomCell.cells[column]]
    // }
    // else if (row === 9 && column === 9) {
    //     topCell.cells[column].classList.add('blockCells')
    //     leftCell.classList.add('blockCells')
    //     ships.blockCeils = [...ships.blockCeils, leftCell, topCell.cells[column]]
    // }
    // else if (row === 0 && column === 9) {
    //     bottomCell.cells[column].classList.add('blockCells')
    //     leftCell.classList.add('blockCells')
    //     ships.blockCeils = [...ships.blockCeils, leftCell, bottomCell.cells[column]]
    // }
    // else if (row === 9 && column === 0) {
    //     topCell.cells[column].classList.add('blockCells')
    //     rightCell.classList.add('blockCells')
    //     ships.blockCeils = [...ships.blockCeils, rightCell, topCell.cells[column]]
    // }
    // else if (leftCell === undefined) {
    //     bottomCell.cells[column].classList.add('blockCells')
    //     topCell.cells[column].classList.add('blockCells')
    //     rightCell.classList.add('blockCells')
    //     ships.blockCeils = [...ships.blockCeils, rightCell, bottomCell.cells[column], topCell.cells[column]]
    // }
    // else if (topCell === undefined) {
    //     bottomCell.cells[column].classList.add('blockCells')
    //     rightCell.classList.add('blockCells')
    //     leftCell.classList.add('blockCells')
    //     ships.blockCeils = [...ships.blockCeils, leftCell, rightCell, bottomCell.cells[column]]
    // }
    // else if (rightCell === undefined) {
    //     bottomCell.cells[column].classList.add('blockCells')
    //     leftCell.classList.add('blockCells')
    //     topCell.cells[column].classList.add('blockCells')
    //     ships.blockCeils = [...ships.blockCeils, leftCell, bottomCell.cells[column], topCell.cells[column]]
    // }
    // else if (bottomCell === undefined) {
    //     rightCell.classList.add('blockCells')
    //     leftCell.classList.add('blockCells')
    //     topCell.cells[column].classList.add('blockCells')
    //     ships.blockCeils = [...ships.blockCeils, leftCell, rightCell, topCell.cells[column]]
    // }
    
    //facets
    for(i = 0; i < type; i++) {
        myField.rows[row - 1].cells[column + i].classList.add('blockCells')
        myField.rows[row + 1].cells[column + i].classList.add('blockCells')
        ships.blockCeils = [...ships.blockCeils, myField.rows[row - 1].cells[column + i], myField.rows[row + 1].cells[column + i]]
    }
    leftCell.classList.add('blockCells')
    myField.rows[row].cells[column + type].classList.add('blockCells')
    ships.blockCeils = [...ships.blockCeils, leftCell, myField.rows[row].cells[column + type], bottomCell.cells[column], topCell.cells[column]]

    ships.blockCeils = ships.blockCeils.filter((item, index, arr) => arr.indexOf(item) === index)
}
