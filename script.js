

let fields = document.querySelectorAll('.battle-field')
let myField = fields[0]
let enemyField = fields[1]
let buildingSection = document.querySelector('.main__set-ships')
let typeShipInputs = document.querySelectorAll('.main__ships-type-input')
let cancelBtn = document.querySelector('.main__ships-cancel-btn')
let directionBtn = document.querySelector('.main__ships-direction-btn')
let battleBtn = document.querySelector('.main__battle-btn')
let fieldsSection = document.querySelector('.fields')
let myRandomBtn = document.querySelector('#my-random-btn')
let gameName = document.querySelector('.main__title')

let shipDirection = 'horizontal'

let flagSameCell

let shipTypeValue

let ships = {
    monoShips: [],
    doubleShips: [],
    tripleShips: [],
    quadroShips: [],
    blockCeils: [],
    attacked: [],
    killed: []
}

let enemyShips = {
    monoShips: [],
    doubleShips: [],
    tripleShips: [],
    quadroShips: [],
    blockCeils: [],
    attacked: []
}

let tagTr = document.createElement('tr')
let tagTd = document.createElement('td')


createTagTr()

makeInactiveCells()

myField.addEventListener('click', switchTypeShip)

fields.forEach(item => item.addEventListener('mouseover', fieldMouseOn))

fields.forEach(item => item.addEventListener('mouseout', fieldMouseOut))

cancelBtn.addEventListener('click', deleteAllShips)

directionBtn.addEventListener('click', setDirectionForBtn)

myRandomBtn.addEventListener('click', () => {
    randomSettingShips(myField)
})

battleBtn.addEventListener('click', startBattle)

enemyField.addEventListener('click', battleOn)

function createTagTd(tr) {
    for (let i = 0; i < 12; i++) {
        let tagTd = document.createElement('td')
        tr.appendChild(tagTd)
    }
}

function createTagTr() {
    for (let i = 0; i < 12; i++) {
        for(let j = 0; j < fields.length; j++) {
            let tagTr = document.createElement('tr')
            createTagTd(tagTr)
            fields[j].appendChild(tagTr)
        }
    }
}

function fieldMouseOn(event) {
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
}

function fieldMouseOut(event) {
    if(event.target.tagName !== 'TD') return;
    const elem = event.target
    const columnCells = [...elem.parentElement.parentElement.children]
    columnCells.map(item => {
        const arrTd = [...item.children]
        arrTd.map(item => {
            item.classList.remove('cellHover')
        })
    })
    const rowCells = [...elem.parentNode.children]
    rowCells.map(item => item.classList.remove('cellHover'))
}

function myAttack(e) {
    let elem = e.target
    let direction

    if (e.target.classList.contains('cellShipBg') && e.target.classList.contains('cellHidden')) {
        e.target.classList.remove('cellHidden')
        enemyShips.attacked.push(e.target)
        
        let counter = 0
        let arrDirection =[]

        for(let [type, arrShips] of Object.entries(enemyShips)) {
            if (type !== 'blockCeils' && type !== 'attacked') {
                for(ship of arrShips) {
                    if(ship.find(item => item === elem)) {
                        console.log(ship)
                        for(ceilShip of ship) {
                            if(ceilShip.classList.contains('cellHidden')) {
                                counter += 1
                            }
                            arrDirection.push(ceilShip.parentElement.rowIndex)
                        }
                        if (counter === 0) {
                            if(arrDirection[0] === arrDirection[1]) {
                                direction = 'horizontal'
                                createBorderShip(ship[0].parentElement.rowIndex, ship[0].cellIndex, ship.length, enemyField, enemyShips, direction)

                            } else {
                                direction = 'vertical'
                                createBorderShip(ship[0].parentElement.rowIndex, ship[0].cellIndex, ship.length, enemyField, enemyShips, direction)
                            }
                        }
                    }
                }
            }
        }
    } 

    if(enemyShips.attacked.length === 20 && ships.killed.length < 20) {
        alert('You won!')
    }
}

function computerAttack() {
    console.log('work')
    let randomHorizontal = getRandomInt(1, 11)
    let randomVertical = getRandomInt(1, 11)
    let elementTarget = myField.rows[randomVertical].cells[randomHorizontal]
    if(ships.attacked.find(item => elementTarget === item) && ships.attacked.length > 0) {
        while(ships.attacked.find(item => elementTarget === item)) {
            randomHorizontal = getRandomInt(1, 11)
            randomVertical = getRandomInt(1, 11)
            elementTarget = myField.rows[randomVertical].cells[randomHorizontal]
        }
        if(elementTarget.classList.contains('cellShipBg')) {
            ships.attacked.push(elementTarget)
            ships.killed.push(elementTarget)
            elementTarget.style.backgroundColor = 'black'
            console.log('hit')
            setTimeout(computerAttack, 1000)
        } else {
            ships.attacked.push(elementTarget)
            elementTarget.style.backgroundColor = 'rgb(6, 14, 138)'
            // console.log('copy element')
        }
    }
    else {
        if(elementTarget.classList.contains('cellShipBg')) {
            ships.attacked.push(elementTarget)
            ships.killed.push(elementTarget)
            elementTarget.style.backgroundColor = 'black'
            setTimeout(computerAttack, 1000)
            // console.log('unique element')
        } else {
            ships.attacked.push(elementTarget)
            elementTarget.style.backgroundColor = 'rgb(6, 14, 138)'
        }
    }
    
    if(ships.killed.length === 20 && enemyShips.attacked.length < 20) {
        alert('computer won!')
    }
}

function battleOn(e) {
    if (e.target.classList.contains('cellShipBg') && e.target.classList.contains('cellHidden')) {
        myAttack(e)
    } else {
        myAttack(e)
        setTimeout(computerAttack, 1000)
    }
}

function startBattle() {
    if(ships.monoShips.length === 4 
        && ships.doubleShips.length === 3
        && ships.tripleShips.length === 2
        && ships.quadroShips.length === 1) 
    {
        buildingSection.className = 'sectionNone'
        enemyField.classList.remove('sectionNone')
        fieldsSection.style.justifyContent = 'start'
        gameName.style.transform = 'rotate(270deg)'
        gameName.style.color = 'rgb(240, 50, 2)'
        battleBtn.style.display = 'none'
        randomSettingShips(enemyField)
        for(let i = 1; i < enemyField.rows.length - 1; i++) {
            for(let j = 1; j < enemyField.rows[i].cells.length - 1; j++)
            enemyField.rows[i].cells[j].classList.add('cellHidden')
        }
        
    } else {
        alert('Установите все корабли')
    }
}

function deleteAllShips() {
    for(let [type, arrShips] of Object.entries(ships)) {
        for(ship of arrShips) {
            if(type === 'blockCeils' && !ship.classList.contains('cellBorder')) {
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
}

function randomSettingShips(field) {
    let objectShips
    if(field === fields[0]) {
        objectShips = ships
    } else {
        objectShips = enemyShips
    }
    for(let i = 4; i > 0; i--) {
        randomSettingEachType(i, field, objectShips)
    }
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

function setDirectionForBtn() {
    if(shipDirection === 'horizontal') {
        shipDirection = 'vertical'
        directionBtn.innerHTML = 'Горизонтально'
    } else {
        shipDirection = 'horizontal'
        directionBtn.innerHTML = 'Вертикально'
    }
}

function randomSettingEachType(type, field, objectShips) {
    
    let maxValue = 12 - type
    let typeShip
    let toggleTypeShip

    if(type === 4) {
        typeShip = objectShips.quadroShips
        toggleTypeShip = setQuadro
    }
    else if (type === 3) {
        typeShip = objectShips.tripleShips
        toggleTypeShip = setTriple
    }
    else if (type === 2) {
        typeShip = objectShips.doubleShips
        toggleTypeShip = setDouble
    } else {
        typeShip = objectShips.monoShips
        toggleTypeShip = setMono
    }

    for (let i = 0; i < 5 - type; i++) {
        let randomHorizontal = getRandomInt(1, maxValue),
            randomVertical = getRandomInt(1, maxValue),
            elementTarget = field.rows[randomVertical].cells[randomHorizontal],
            flag = true
        let counter = 0
        while(typeShip.length < i + 1) {
            counter++
            if(counter > 5000) {
                alert('Достройте недостающие корабли')
                break;
            }
            setDirection()
            if(flag) {
                toggleTypeShip(elementTarget, randomVertical, randomHorizontal, field, objectShips, shipDirection)
                flag = false
            } else {
                randomHorizontal = getRandomInt(1, maxValue)
                randomVertical = getRandomInt(1, maxValue)
                elementTarget = field.rows[randomVertical].cells[randomHorizontal] 
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
            shipType = item
        }
    }
    let direction = shipDirection
    setMaxShipValue(event, shipType, direction)
}

function setMaxShipValue(e, shipTypeButton, direction) {
    const elem = e.target,
          elemRow = elem.parentElement.rowIndex,
          elemColumn = elem.cellIndex
    
    if (shipTypeButton.value === '1' && ships.monoShips.length < 4) {
        setMono(elem, elemRow, elemColumn, myField, ships, direction)
        if(ships.monoShips.length === 4) {
            shipTypeButton.disabled = true
        }
    }
    else if (shipTypeButton.value === '2' && ships.doubleShips.length < 3) {
        setDouble(elem, elemRow, elemColumn, myField, ships, direction)
        if(ships.doubleShips.length === 3) {
            shipTypeButton.disabled = true
        }
    }
    else if (shipTypeButton.value === '3' && ships.tripleShips.length < 2) {
        setTriple(elem, elemRow, elemColumn, myField, ships, direction)
        if(ships.tripleShips.length === 2) {
            shipTypeButton.disabled = true
            
        }
    }
    else if (shipTypeButton.value === '4' && ships.quadroShips.length < 1) {
        setQuadro(elem, elemRow, elemColumn, myField, ships, direction)
        if(ships.quadroShips.length === 1) {
            shipTypeButton.disabled = true
        }
    } 
    else {
        
        // alert('Установлено максимальное количество кораблей данного типа')
    }
}

function makeInactiveCells() {
    for(let j = 0; j < 2; j++) {
        for(let i = 0; i < 12; i++) {
            fields[j].rows[0].cells[i].classList.add('cellBorder')
            fields[j].rows[11].cells[i].classList.add('cellBorder')
            fields[j].rows[i].cells[0].classList.add('cellBorder')
            fields[j].rows[i].cells[11].classList.add('cellBorder')
            if(j === 0) {
                ships.blockCeils = [...ships.blockCeils, fields[j].rows[0].cells[i], fields[j].rows[11].cells[i], fields[j].rows[i].cells[0], fields[j].rows[i].cells[11]]
            } else {
                enemyShips.blockCeils = [...enemyShips.blockCeils, fields[j].rows[0].cells[i], fields[j].rows[11].cells[i], fields[j].rows[i].cells[0], fields[j].rows[i].cells[11]]
            }
        }
    }
}

//Setting ships on the field
function setMono(elem, elemRow, elemColumn, field, objectShips, direction) {
    if(shipDirection === 'horizontal') {
        setHorizontalShips(elem, elemRow, elemColumn, 1, field, objectShips, direction)
    } else {
        setVerticalShips(elem, elemRow, elemColumn, 1, field, objectShips, direction)
    } 
}

function setDouble(elem, elemRow, elemColumn, field, objectShips, direction) {
    if(shipDirection === 'horizontal') {
        setHorizontalShips(elem, elemRow, elemColumn, 2, field, objectShips, direction)
    } else {
        setVerticalShips(elem, elemRow, elemColumn, 2, field, objectShips, direction)
    }
}

function setTriple(elem, elemRow, elemColumn, field, objectShips, direction) {
    if(shipDirection === 'horizontal') {
        setHorizontalShips(elem, elemRow, elemColumn, 3, field, objectShips, direction)
    } else {
        setVerticalShips(elem, elemRow, elemColumn, 3, field, objectShips, direction)
    }
}

function setQuadro(elem, elemRow, elemColumn, field, objectShips, direction) {
    if(shipDirection === 'horizontal') {
        setHorizontalShips(elem, elemRow, elemColumn, 4, field, objectShips, direction)
    } else {
        setVerticalShips(elem, elemRow, elemColumn, 4, field, objectShips, direction)
    }
}

function setHorizontalShips(elem, elemRow, elemColumn, typeShip, field, objectShips, direction) {
    if(elem.tagName !== 'TD') return;
    if(elem.classList.contains('blockCells')) return;

    let shipLength = typeShip
    
    if(elemRow === 0 || elemColumn === 0 || elemRow === 11 || elemColumn === 11) {
        console.log('установка запрещена')
    } else {
        switch (typeShip) {
            case 1:
                currentArrShips = objectShips.monoShips
                break;
            case 2:
                currentArrShips = objectShips.doubleShips
                break;
            case 3:
                currentArrShips = objectShips.tripleShips
                break;
            case 4:
                currentArrShips = objectShips.quadroShips
                break;    
        }
        
        if(!elem.classList.contains('cellShipBg') && elemColumn <= 11 - shipLength) {
            if(shipLength === 1 
               || (!field.rows[elemRow].cells[elemColumn + typeShip].classList.contains('cellShipBg'))) 
            {
                let cellShip = []
                let flag
                let clearCellFlag = []

                for(i = 0; i <= shipLength - 1; i++) {
                    if(!field.rows[elemRow].cells[elemColumn + typeShip - i - 1].classList.contains('cellShipBg')
                    && !field.rows[elemRow].cells[elemColumn + typeShip - i - 1].classList.contains('blockCells')) {
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
                        field.rows[elemRow].cells[elemColumn + i].classList.add('cellShipBg')
                        // if(numberField === fields[1]) {
                        //     enemyField.rows[elemRow].cells[elemColumn + i].classList.add('cellShipBg')
                        // }
                        cellShip.push(field.rows[elemRow].cells[elemColumn + i])
                    } else {
                        flag = false
                    }
                }
                if (flag === undefined) {
                    createBorderShip(elemRow, elemColumn, shipLength, field, objectShips, direction)
                    currentArrShips.push(cellShip)
                    flagSameCell = true
                }

            }
        }
    }    
}

function setVerticalShips(elem, elemRow, elemColumn, typeShip, field, objectShips, direction) {
    if(elem.tagName !== 'TD') return;
    if(elem.classList.contains('blockCells')) return;
    let shipLength = typeShip

    if(elemRow === 0 || elemColumn === 0 || elemRow === 11 || elemColumn === 11) {
        console.log('установка запрещена')
    } else {
        switch (typeShip) {
            case 1:
                currentArrShips = objectShips.monoShips
                break;
            case 2:
                currentArrShips = objectShips.doubleShips
                break;
            case 3:
                currentArrShips = objectShips.tripleShips
                break;
            case 4:
                currentArrShips = objectShips.quadroShips
                break;    
        }
        if(!elem.classList.contains('cellShipBg') && elemRow <= 11 - shipLength) {
            if(shipLength === 1
                || (!field.rows[elemRow + typeShip].cells[elemColumn].classList.contains('cellShipBg'))) 
            {
                let cellShip = []
                let flag
                let clearCellFlag = []
                for(i = 0; i <= shipLength - 1; i++) {
                    if(!field.rows[elemRow + typeShip - i - 1].cells[elemColumn].classList.contains('cellShipBg')
                    && !field.rows[elemRow + typeShip - i - 1].cells[elemColumn].classList.contains('blockCells')) {
                        clearCellFlag = [...clearCellFlag, true]
                    } else {
                        clearCellFlag = [...clearCellFlag, false]
                    }
                }
                flag = clearCellFlag.find(item => item === false)
                for(i = 0; i <= shipLength - 1; i++) {
                    if(flag === undefined) {
                        field.rows[elemRow + i].cells[elemColumn].classList.add('cellShipBg')
                        cellShip.push(field.rows[elemRow + i].cells[elemColumn])
                    } else {
                        flag = false
                    }
                }
                if (flag === undefined) {
                    createBorderShip(elemRow, elemColumn, shipLength, field, objectShips, direction)
                    currentArrShips.push(cellShip)
                }
            }
        }
    }
}

function createBorderShip(row, column, type, field, objectShips, direction) {
    let leftCell = field.rows[row].cells[column - 1]
    let topCell = field.rows[row - 1] 

    if(direction === 'horizontal') {
        for(i = 0; i < type + 2; i++) {
            field.rows[row - 1].cells[column - 1 + i].classList.add('blockCells')
            field.rows[row + 1].cells[column - 1 + i].classList.add('blockCells')
            field.rows[row + 1].cells[column - 1 + i].classList.remove('cellHidden')
            field.rows[row - 1].cells[column - 1 + i].classList.remove('cellHidden')

            objectShips.blockCeils = [...objectShips.blockCeils, field.rows[row - 1].cells[column - 1 + i], field.rows[row + 1].cells[column - 1 + i]]
        }
        leftCell.classList.add('blockCells')
        leftCell.classList.remove('cellHidden')
        field.rows[row].cells[column + type].classList.add('blockCells')
        field.rows[row].cells[column + type].classList.remove('cellHidden')

        objectShips.blockCeils = [...objectShips.blockCeils, leftCell, field.rows[row].cells[column + type]]
    
        objectShips.blockCeils = objectShips.blockCeils.filter((item, index, arr) => arr.indexOf(item) === index)
    } else {
        for(i = 0; i < type + 2; i++) {
            field.rows[row - 1 + i].cells[column - 1].classList.add('blockCells')
            field.rows[row - 1 + i].cells[column + 1].classList.add('blockCells')
            field.rows[row - 1 + i].cells[column - 1].classList.remove('cellHidden')
            field.rows[row - 1 + i].cells[column + 1].classList.remove('cellHidden')
            objectShips.blockCeils = [...objectShips.blockCeils, field.rows[row - 1 + i].cells[column - 1], field.rows[row - 1 + i].cells[column + 1]]
        }
        topCell.cells[column].classList.add('blockCells')
        topCell.cells[column].classList.remove('cellHidden')

        field.rows[row + type].cells[column].classList.add('blockCells')
        field.rows[row + type].cells[column].classList.remove('cellHidden')

        objectShips.blockCeils = [...objectShips.blockCeils, topCell.cells[column], field.rows[row + type].cells[column]]

        objectShips.blockCeils = objectShips.blockCeils.filter((item, index, arr) => arr.indexOf(item) === index)
    }
}
