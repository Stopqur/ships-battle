

let fields = document.querySelectorAll('.battle-field')
let myField = fields[0]
let enemyField = fields[1]
// let enemyField = document.querySelector('.main__enemyField')
let buildingSection = document.querySelector('.main__set-ships')
let typeShipInputs = document.querySelectorAll('.main__ships-type-input')
let cancelBtn = document.querySelector('.main__ships-cancel-btn')
let directionBtn = document.querySelector('.main__ships-direction-btn')
let battleBtn = document.querySelector('.main__battle-btn')
let fieldsSection = document.querySelector('.fields')
let randomBtn = document.querySelector('.main__random-btn')

let shipDirection = 'horizontal'

let flagSameCell

let shipTypeValue
let ships = {
    monoShips: [],
    doubleShips: [],
    tripleShips: [],
    quadroShips: [],
    blockCeils: []
}

let enemyShips = {
    blockCeils: []
}

makeInactiveCells()

myField.addEventListener('click', switchTypeShip)

fields.forEach(item => item.addEventListener('mouseover', function(event) {
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
}))

fields.forEach(item => item.addEventListener('mouseout', function(event) {
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
}))


cancelBtn.addEventListener('click', () => {
    for(let [type, arrShips] of Object.entries(ships)) {
        for(ship of arrShips) {
            if(type === 'blockCeils' && !ship.classList.contains('cellHidden')) {
                ship.className = ''
            } 
            else if (type !== 'blockCeils') {
                arrShips = ship.map(item => {
                    item.className = ''
                    return item
                }) 
            }
        }    
        ships[`${type}`] = [] 
    }
})

directionBtn.addEventListener('click', function() {
    console.log(ships)
    if(shipDirection === 'horizontal') {
        shipDirection = 'vertical'
        directionBtn.innerHTML = 'Горизонтально'
    } else {
        shipDirection = 'horizontal'
        directionBtn.innerHTML = 'Вертикально'
    }
})

battleBtn.addEventListener('click', function() {
    if(ships.monoShips.length === 4 
    && ships.doubleShips.length === 3
    && ships.tripleShips.length === 2
    && ships.quadroShips.length === 1) {
        buildingSection.className = 'sectionNone'
        enemyField.classList.remove('sectionNone')
        fieldsSection.style.justifyContent = 'start'
        console.log(enemyShips)
        console.log(ships)
    } else {

        alert('Установите все корабли')
    }
})

randomBtn.addEventListener('click', randomSettingShips)


function randomSettingShips() {
    for(let i = 1; i < 5; i++) {
        randomSettingEachType(i)
    }
    console.log(ships)
}

function setDirection() {
    if(getRandomInt(0, 2) === 1) {
        shipDirection = 'horizontal'
        return shipDirection
    } else {
        shipDirection = 'vertical'
        return shipDirection
    }
}

function randomSettingEachType(type) {
    let maxValue = 12 - type
    let typeShip
    let toggleTypeShip

    if(type === 4) {
        typeShip = ships.quadroShips
        toggleTypeShip = setQuadro
    }
    else if (type === 3) {
        typeShip = ships.tripleShips
        toggleTypeShip = setTriple
    }
    else if (type === 2) {
        typeShip = ships.doubleShips
        toggleTypeShip = setDouble
    } else {
        typeShip = ships.monoShips
        toggleTypeShip = setMono
    }

    for (let i = 0; i < 5 - type; i++) {
        let randomHorizontal = getRandomInt(1, maxValue),
            randomVertical = getRandomInt(1, maxValue),
            elementTarget = fields[0].rows[randomVertical].cells[randomHorizontal],
            flag = true
        
        while(typeShip.length < i + 1) {
            setDirection()

            if(flag) {
                toggleTypeShip(elementTarget, randomVertical, randomHorizontal)
                flag = false
            } else {
                randomHorizontal = getRandomInt(1, maxValue)
                randomVertical = getRandomInt(1, maxValue)
                elementTarget = fields[0].rows[randomVertical].cells[randomHorizontal] 
                flag = true
            }
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

function switchTypeShip(event) {
    for(item of typeShipInputs) {
        if (item.checked) {
            shipTypeValue = item.value
        }
    }
    setMaxShipValue(event, shipTypeValue)
}

function setMaxShipValue(e, value) {
    const elem = e.target,
          elemRow = elem.parentElement.rowIndex,
          elemColumn = elem.cellIndex

    if (value === '1' && ships.monoShips.length < 4) {
        setMono(elem, elemRow, elemColumn)
    }
    else if (value === '2' && ships.doubleShips.length < 3) {
        setDouble(elem, elemRow, elemColumn)
    }
    else if (value === '3' && ships.tripleShips.length < 2) {
        setTriple(elem, elemRow, elemColumn)
    }
    else if (value === '4' && ships.quadroShips.length < 1) {
        setQuadro(elem, elemRow, elemColumn)
    } 
    else {
        alert('Установлено максимальное количество кораблей данного типа')
    }
}

function makeInactiveCells() {
    for(let j = 0; j < 2; j++) {
        for(let i = 0; i < 12; i++) {
            fields[j].rows[0].cells[i].classList.add('cellHidden')
            fields[j].rows[11].cells[i].classList.add('cellHidden')
            fields[j].rows[i].cells[0].classList.add('cellHidden')
            fields[j].rows[i].cells[11].classList.add('cellHidden')
            if(j === 0) {
                ships.blockCeils = [...ships.blockCeils, fields[j].rows[0].cells[i], fields[j].rows[11].cells[i], fields[j].rows[i].cells[0], fields[j].rows[i].cells[11]]
            } else {
                enemyShips.blockCeils = [...enemyShips.blockCeils, fields[j].rows[0].cells[i], fields[j].rows[11].cells[i], fields[j].rows[i].cells[0], fields[j].rows[i].cells[11]]
            }
        }
    }
}

//Setting ships on the field
function setMono(elem, elemRow, elemColumn) {
    if(shipDirection === 'horizontal') {
        setHorizontalShips(elem, elemRow, elemColumn, 1)
    } else {
        setVerticalShips(elem, elemRow, elemColumn, 1)
    } 
}

function setDouble(elem, elemRow, elemColumn) {
    if(shipDirection === 'horizontal') {
        setHorizontalShips(elem, elemRow, elemColumn, 2)
    } else {
        setVerticalShips(elem, elemRow, elemColumn, 2)
    }
}

function setTriple(elem, elemRow, elemColumn) {
    if(shipDirection === 'horizontal') {
        setHorizontalShips(elem, elemRow, elemColumn, 3)
    } else {
        setVerticalShips(elem, elemRow, elemColumn, 3)
    }
}

function setQuadro(elem, elemRow, elemColumn) {
    if(shipDirection === 'horizontal') {
        setHorizontalShips(elem, elemRow, elemColumn, 4)
    } else {
        setVerticalShips(elem, elemRow, elemColumn, 4)
    }
}

function setHorizontalShips(elem, elemRow, elemColumn, typeShip) {
    if(elem.tagName !== 'TD') return;
    if(elem.classList.contains('blockCells')) return;

    let shipLength = typeShip
    
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
                let clearCellFlag = []

                for(i = 0; i <= shipLength - 1; i++) {
                    if(!myField.rows[elemRow].cells[elemColumn + typeShip - i - 1].classList.contains('cellShipBg')
                    && !myField.rows[elemRow].cells[elemColumn + typeShip - i - 1].classList.contains('blockCells')) {
                        clearCellFlag = [...clearCellFlag, true]
                        flagSameCell = true

                    } else {
                        clearCellFlag = [...clearCellFlag, false]
                        flagSameCell = false
                    }
                }

                flag = clearCellFlag.find(item => item === false)
                for(i = 0; i <= shipLength - 1; i++) {
                    if(flag === undefined) {
                        myField.rows[elemRow].cells[elemColumn + i].classList.add('cellShipBg')
                        cellShip.push(myField.rows[elemRow].cells[elemColumn + i])
                    } else {
                        flag = false
                    }
                }
                if (flag === undefined) {
                    createBorderShip(elemRow, elemColumn, shipLength)
                    currentArrShips.push(cellShip)
                    flagSameCell = true
                }

            }
        }
    }    
}

function setVerticalShips(elem, elemRow, elemColumn, typeShip) {
    if(elem.tagName !== 'TD') return;
    if(elem.classList.contains('blockCells')) return;
    
    let shipLength = typeShip

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
        if(!elem.classList.contains('cellShipBg') && elemRow <= 11 - shipLength) {
            if(shipLength === 1
                || (!myField.rows[elemRow + typeShip].cells[elemColumn].classList.contains('cellShipBg'))) 
            {
                let cellShip = []
                let flag
                let clearCellFlag = []
                for(i = 0; i <= shipLength - 1; i++) {
                    if(!myField.rows[elemRow + typeShip - i - 1].cells[elemColumn].classList.contains('cellShipBg')
                    && !myField.rows[elemRow + typeShip - i - 1].cells[elemColumn].classList.contains('blockCells')) {
                        clearCellFlag = [...clearCellFlag, true]
                    } else {
                        clearCellFlag = [...clearCellFlag, false]
                    }
                }
                flag = clearCellFlag.find(item => item === false)
                for(i = 0; i <= shipLength - 1; i++) {
                    if(flag === undefined) {
                        myField.rows[elemRow + i].cells[elemColumn].classList.add('cellShipBg')
                        cellShip.push(myField.rows[elemRow + i].cells[elemColumn])
                    } else {
                        flag = false
                    }
                }
                if (flag === undefined) {
                    createBorderShip(elemRow, elemColumn, shipLength)
                    currentArrShips.push(cellShip)
                }
            }
        }
    }
}

function createBorderShip(row, column, type) {
    let leftCell = myField.rows[row].cells[column - 1]
    let topCell = myField.rows[row - 1] 

    if(shipDirection === 'horizontal') {
        for(i = 0; i < type; i++) {
            myField.rows[row - 1].cells[column + i].classList.add('blockCells')
            myField.rows[row + 1].cells[column + i].classList.add('blockCells')
            ships.blockCeils = [...ships.blockCeils, myField.rows[row - 1].cells[column + i], myField.rows[row + 1].cells[column + i]]
        }
        leftCell.classList.add('blockCells')
        myField.rows[row].cells[column + type].classList.add('blockCells')
        ships.blockCeils = [...ships.blockCeils, leftCell, myField.rows[row].cells[column + type]]
    
        ships.blockCeils = ships.blockCeils.filter((item, index, arr) => arr.indexOf(item) === index)
    } else {
        for(i = 0; i < type; i++) {
            myField.rows[row + i].cells[column - 1].classList.add('blockCells')
            myField.rows[row + i].cells[column + 1].classList.add('blockCells')
            ships.blockCeils = [...ships.blockCeils, myField.rows[row + i].cells[column - 1], myField.rows[row + i].cells[column + 1]]
        }
        topCell.cells[column].classList.add('blockCells')
        myField.rows[row + type].cells[column].classList.add('blockCells')
        ships.blockCeils = [...ships.blockCeils, topCell.cells[column], myField.rows[row + type].cells[column]]

        ships.blockCeils = ships.blockCeils.filter((item, index, arr) => arr.indexOf(item) === index)
    }
}
