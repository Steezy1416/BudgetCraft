export const initialExpense = {
    expenseName: "",
    currentAmmount: "",
    maxAmmount: "",
    color: ""
}

export const expenseReducer = (state, action) => {
    switch(action.type){
        case "changeExpenseName": {
            return{
                ...state,
                expenseName: action.value
            }
        }
        case "changeCurrentAmmount": {
            return{
                ...state,
                currentAmmount: parseFloat(action.value)
            }
        }
        case "changeMaxAmmount": {
            return{
                ...state,
                maxAmmount: parseFloat(action.value)
            }
        }
        case "changeColor": {
            return{
                ...state,
                color: action.value
            }
        }
        default : {

        }
    }
}