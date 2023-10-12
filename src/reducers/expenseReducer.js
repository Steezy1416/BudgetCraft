export const initialExpense = {
    withdrawalFrom: "Personal",
    expenseName: "",
    currentAmmount: "",
    maxAmmount: "",
    color: ""
}

export const expenseReducer = (state, action) => {
    switch(action.type){
        case "changeWithdrawalFrom": {
            return{
                ...state,
                withdrawalFrom: action.value
            }
        }
        case "changeExpenseName": {
            return{
                ...state,
                expenseName: action.value
            }
        }
        case "changeCurrentAmmount": {
            return{
                ...state,
                currentAmmount: action.value
            }
        }
        case "changeMaxAmmount": {
            return{
                ...state,
                maxAmmount: action.value
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