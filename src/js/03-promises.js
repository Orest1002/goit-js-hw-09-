import Notiflix, { Notify } from 'notiflix';

const form = document.querySelector('.form');


form.addEventListener('submit', onCreatePromise );

function createPromise(position, delay) {
 return new Promise((resolve, reject) => {
  setTimeout(() => {
    
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({position, delay});
    } else {
      reject({position, delay});
    }

  }, delay);

 });
 
};

function onCreatePromise(evt){
  evt.preventDefault();
  let delay = Number(form.delay.value);
  for( let i=1; i <= form.amount.value; i += 1 ){
    createPromise(i, delay)

  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  delay += Number(form.step.value);
  }

}
