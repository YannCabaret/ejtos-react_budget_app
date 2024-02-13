import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, currency } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => {
        return (total = total + item.cost);
    }, 0);
    const [newBudget, setNewBudget] = useState(budget);
    const { dispatch } = useContext(AppContext);
    const handleBudgetChange = (event) => {
        setNewBudget((prevBudget) => { 

            let newBudget = event.target.value;

            if (newBudget - totalExpenses < 0) {
                alert("You cannot reduce the budget value lower than the spending");
                return prevBudget;
            }
    
            dispatch({
                type: 'SET_BUDGET',
                payload: newBudget
            });

            return event.target.value;
        });
    }
    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency}</span>
            <input type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>
        </div>
    );
};
export default Budget;