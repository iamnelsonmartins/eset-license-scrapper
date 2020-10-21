import React from 'react';
import useFetch from './useFetch.component';
const url = 'https://tnods1.blogspot.com/feeds/posts/default?alt=json';

function App() {
  const { loading, data, update } = useFetch(url);
  const regexKey = /[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}/g;
  const regexDate = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g;
  const regexUpdate = /[0-9]{4}-[0-9]{2}-[0-9]{2}/g;
  let regexedKey = data.match(regexKey);
  let regexedDate = data.match(regexDate);
  let regexedUpdate = update.match(regexUpdate);

  const copySerial = (index) => {
    const element = document.querySelectorAll('.serial');
    const btn = document.querySelectorAll('.btn');
    element[index].select();
    document.execCommand('copy');
    btn[index].innerHTML = 'copied!';
    setTimeout(() => {
      btn[index].innerHTML = 'copy';
    }, 2000);
  };

  return (
    <>
      <p className='title'>Eset License Scrapper</p>
      <p className='subtitle'>
        {loading ? '' : 'last update ' + regexedUpdate}
      </p>
      <section className='grid-container'>
        {loading ? (
          <div className='modal'>
            <p>Loading...</p>
          </div>
        ) : (
          regexedKey.map((value, index) => {
            const date = regexedDate[index];
            return (
              <div key={index} className='item'>
                <p>
                  <label className='pre'>Serial</label>
                  <input
                    type='text'
                    value={value}
                    readOnly
                    className='serial'
                  />
                  <button
                    className='btn'
                    value='copy'
                    onClick={() => copySerial(index)}
                  >
                    copy
                  </button>
                </p>
                <p>
                  <label className='pre'>Date</label>
                  <input type='text' value={date} disabled />
                </p>
              </div>
            );
          })
        )}
      </section>
    </>
  );
}

export default App;
