let myField = document.querySelector('.main__myField')
let eyeBtn = document.querySelector('.main__btnHide')

let ships = {
    monoShips: [],
    doubleShips: [],
    tripleShips: [],
    quadroShips: [],
    blockCeils: []
}


myField.addEventListener('click', monoShip)

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

//Setting ships on the field
function monoShip(e) {
    setHorizontalShip(e, 1)
}

function doubleShip(e) {
    setHorizontalShip(e, 2)
}

function tripleShip(e) {
    setHorizontalShip(e, 3)
}

function fourthShip(e) {
    setHorizontalShip(e, 4)
}

function setHorizontalShip(e, typeShip) {
    let flagBlock
    if(e.target.tagName !== 'TD') return;
    if(e.target.classList.contains('blockCells')) return;

    let shipLength = typeShip
    const elem = e.target,
          elemRow = elem.parentElement.rowIndex,
          elemColumn = elem.cellIndex
    
    if (typeShip === 2) {
        currentArrShips = ships.doubleShips
    }
    else if (typeShip === 3) {
        currentArrShips = ships.tripleShips
    }
    else if (typeShip === 4) {
        currentArrShips = ships.quadroShips
    } else {
        currentArrShips = ships.monoShips
    }

    if(!elem.classList.contains('cellBg')) {
        flagBlock = true
        if(shipLength === 1 || (!elem.nextElementSibling.classList.contains('cellBg') 
        && elemColumn <= 10 - shipLength)) {
            let cellShip = []
            for(i = 0; i <= shipLength - 1; i++) {
                if(!myField.rows[elemRow].cells[elemColumn + i].classList.contains('blockCells')) {
                    console.log('yeah')
                    cellShip.push(myField.rows[elemRow].cells[elemColumn + i])
                    myField.rows[elemRow].cells[elemColumn + i].classList.add('cellBg')
                    borderShip(elemRow, elemColumn, flagBlock)
                }
            }
            currentArrShips.push(cellShip)
        } else {
            alert('Невозможно установить')
        }
         
    } 
    //Условие удаления корабля
    // else {
    //     flagBlock = false
    //     borderShip(elemRow, elemColumn, flagBlock)
    //     currentArrShips = currentArrShips.filter(arrShip => {
    //         if(arrShip.find(i => i === elem) !== undefined) {
    //             arrShip = arrShip.map(item => item.classList.remove('cellBg'))
    //             return false
    //         } return true

    //     }) 
    // }
    console.log(ships.monoShips)
}


function borderShip(rowIndex, columnIndex, flag) {
    let leftCell = myField.rows[rowIndex].cells[columnIndex - 1]
    let topCell = myField.rows[rowIndex - 1] 
    let bottomCell = myField.rows[rowIndex + 1]
    let rightCell = myField.rows[rowIndex].cells[columnIndex + 1]
    
    if(flag) {
        // if(leftCell === undefined 
        // || topCell === undefined 
        // || bottomCell === undefined 
        // || rightCell === undefined) {
        //     console.log('border')
        // } 
        if (rowIndex === 0 && columnIndex === 0) {
            ships.blockCeils = [...ships.blockCeils, rightCell, bottomCell.cells[columnIndex]]
            bottomCell.cells[columnIndex].classList.add('blockCells')
            rightCell.classList.add('blockCells')
        }
        else if (rowIndex === 9 && columnIndex === 9) {
            ships.blockCeils = [...ships.blockCeils, leftCell, topCell.cells[columnIndex]]
            topCell.cells[columnIndex].classList.add('blockCells')
            leftCell.classList.add('blockCells')
        }
        else if (rowIndex === 0 && columnIndex === 9) {
            console.log('qqq', bottomCell.cells[columnIndex])
            ships.blockCeils = [...ships.blockCeils, leftCell, bottomCell.cells[columnIndex]]
            bottomCell.cells[columnIndex].classList.add('blockCells')
            leftCell.classList.add('blockCells')
        }
        else if (rowIndex === 9 && columnIndex === 0) {
            console.log(rowIndex, columnIndex)
            ships.blockCeils = [...ships.blockCeils, rightCell, topCell.cells[columnIndex]]
            topCell.cells[columnIndex].classList.add('blockCells')
            rightCell.classList.add('blockCells')
        }
        else if (leftCell === undefined) {
            console.log('sfsf')
            ships.blockCeils = [...ships.blockCeils, rightCell, bottomCell.cells[columnIndex], topCell.cells[columnIndex]]
            bottomCell.cells[columnIndex].classList.add('blockCells')
            topCell.cells[columnIndex].classList.add('blockCells')
            rightCell.classList.add('blockCells')
        }
        else if (topCell === undefined) {
            ships.blockCeils = [...ships.blockCeils, leftCell, rightCell, bottomCell.cells[columnIndex]]
            bottomCell.cells[columnIndex].classList.add('blockCells')
            rightCell.classList.add('blockCells')
            leftCell.classList.add('blockCells')
        }
        else if (rightCell === undefined) {
            ships.blockCeils = [...ships.blockCeils, leftCell, bottomCell.cells[columnIndex], topCell.cells[columnIndex]]
            bottomCell.cells[columnIndex].classList.add('blockCells')
            leftCell.classList.add('blockCells')
            topCell.cells[columnIndex].classList.add('blockCells')
        }
        else if (bottomCell === undefined) {
            ships.blockCeils = [...ships.blockCeils, leftCell, rightCell, topCell.cells[columnIndex]]
            rightCell.classList.add('blockCells')
            leftCell.classList.add('blockCells')
            topCell.cells[columnIndex].classList.add('blockCells')
        }
        else {
            ships.blockCeils = [...ships.blockCeils, leftCell, rightCell, bottomCell.cells[columnIndex], topCell.cells[columnIndex]]
            console.log(ships.blockCeils)
            leftCell.classList.add('blockCells')
            topCell.cells[columnIndex].classList.add('blockCells')
            bottomCell.cells[columnIndex].classList.add('blockCells')
            rightCell.classList.add('blockCells')
        }
    }
    //Условие удаления границы корабля
    //  else {
    //     leftCell.classList.remove('blockCells')
    //     topCell.cells[columnIndex].classList.remove('blockCells')
    //     bottomCell.cells[columnIndex].classList.remove('blockCells')
    //     rightCell.classList.remove('blockCells')
    // }

}

function borderShipDouble(rowIndex, columnIndex) {
    let leftCell = myField.rows[rowIndex].cells[columnIndex - 1]
    let topCell = myField.rows[rowIndex - 1] 
    let bottomCell = myField.rows[rowIndex + 1]
    let rightCell = myField.rows[rowIndex].cells[columnIndex + 2]

    if(leftCell === undefined 
    || topCell === undefined 
    || bottomCell === undefined 
    || rightCell === undefined) {
        console.log('border')
    } else {
        ships.blockCeils = [...ships.blockCeils, leftCell, rightCell, bottomCell.cells[columnIndex], topCell.cells[columnIndex]]
        console.log(ships.blockCeils)
        leftCell.classList.add('blockCells')
        topCell.cells[columnIndex].classList.add('blockCells')
        bottomCell.cells[columnIndex].classList.add('blockCells')
        rightCell.classList.add('blockCells')
    }
}





//for rollback
// function secondShip(e) {
//     if(e.target.tagName !== 'TD') return;
//     const elem = e.target,
//           elemRow = elem.parentElement.rowIndex,
//           elemColumn = elem.cellIndex
//     if(elemColumn < 9) {
//         if(elem.classList.contains('cellBg')) {
//             ships.doubleShips = ships.doubleShips.filter(arrShip => {
//                 if(arrShip.find(i => i === elem) !== undefined) {
//                     arrShip = arrShip.map(item => item.classList.remove('cellBg'))
//                     return false
//                 } return true

//             })  
//         } else {
//             if(!elem.nextElementSibling.classList.contains('cellBg')) {
//                 let cellShip = []
//                 for(i = 0; i <= 1; i++) {
//                     cellShip.push(myField.rows[elemRow].cells[elemColumn + i])
//                     myField.rows[elemRow].cells[elemColumn + i].classList.add('cellBg')
//                 }
//                 ships.doubleShips.push(cellShip)
//             } else {
//                 alert('Невозможно установить')
//             }
//         }
//     }  
// }