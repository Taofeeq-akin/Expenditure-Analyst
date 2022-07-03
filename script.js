'use strict'
// Data 
const account = {
    incomeMovement: [],
    expensesMovement: [],
    icomeDescription : [],
    expensesDescription: [],
};

// Elements
const labelBalance = document.querySelector('.available-balance');
const labelSumIncome = document.querySelector('.total-income');
const labelSumExpenses = document.querySelector('.total-expenses');

const btnSubmit = document.querySelector('.checkmark');

const value = document.querySelector('.value--input');
const description = document.querySelector('.description')

const positiveMovement = document.querySelector('.income-row');
const negativeMovement = document.querySelector('.expenses-row');

const option = document.querySelector('.option')


// logics

// Display income movement
const displayIncomeMovement = function (movements){
    positiveMovement.innerHTML = '';

    movements.forEach((value , i) => {
        const html = `<div class="income-text">
        <p class="income-p">
         ${account.icomeDescription[i]}
        </p>
        <P>
            + <span class="income-price"> ${value} </span>
        </P>
    </div>`;

    positiveMovement.insertAdjacentHTML('afterbegin', html)
    });

}
displayIncomeMovement(account.incomeMovement);

// display expenses movement
const displayExpensesMovement = function(movements){
    negativeMovement.innerHTML = '';

    movements.forEach((value, i) => {
    //    const describe = movements.forEach(desc => {
            
    //     })
        const html = `<div class="expenses-text">
        <p class="income-p">
         ${account.expensesDescription[i]}
        </p>
        <P>
             <span class="expenses-price"> ${value} </span>
        </P>
        </div>`;

        negativeMovement.insertAdjacentHTML('afterbegin', html)
    });

}
displayExpensesMovement(account.expensesMovement);

// Display income movement balance
const calculateSumIn = function(incomeMovement){
  const incomeBalance =  incomeMovement.reduce((current, value) =>
    current + value, 0)
    labelSumIncome.textContent = `${incomeBalance}`
};
calculateSumIn(account.incomeMovement);

// Display expenses movement balance
const calculateSumOut = function(expensesMovement){
    const expensesBalance = expensesMovement.reduce((cur, value) => cur + value, 0)

    labelSumExpenses.textContent = `${expensesBalance}`
} 
calculateSumOut(account.expensesMovement);


// Display Total Balance
const totalBalance = [[account.incomeMovement],[account.expensesMovement]];
const displayBalance = function(totalBalance){
    const balanceValue = totalBalance.flat(2).reduce((cur, val) => cur + val, 0).toFixed(2);

    // console.log(balanceValue)
    labelBalance.textContent = `${balanceValue}`
}
displayBalance(totalBalance);


// Mark button
btnSubmit.addEventListener('click', function(e){
    e.preventDefault();
    const amount = Number(value.value);
    console.log(amount)
    const descriptionText = description.value;

    if (amount > 0 && option.value === 'plus' && descriptionText){
        account.incomeMovement.push(amount);
        account.icomeDescription.push(descriptionText);

        value.value = description.value = '';

        displayBalance(totalBalance);
        calculateSumIn(account.incomeMovement);
        displayIncomeMovement(account.incomeMovement);

    } else if (amount > 0 && option.value === 'minus'){
        account.expensesMovement.push(-amount);
        account.expensesDescription.push(descriptionText);

        value.value = description.value = '';

        displayBalance(totalBalance);
        calculateSumOut(account.expensesMovement);
        displayExpensesMovement(account.expensesMovement);

    }
    
})