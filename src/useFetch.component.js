import { useState, useEffect } from 'react';
import jsonp from 'jsonp';

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const [update, setUpdate] = useState('');

  const getData = () => {
    jsonp(url, null, (err, data) => {
      if (err) {
        console.log(err);
        setLoading(false);
        setData('there was an error');
      } else {
        const result = data.feed.entry[0].content.$t;
        const update = data.feed.updated.$t;
        setUpdate(update);
        setData(result);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getData();
  });

  return { loading, data, update };
};

export default useFetch;
