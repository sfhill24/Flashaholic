//Handlebars.registerHelper('json', function (content) {
  //return JSON.stringify(content);
//});

module.exports = {
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },

  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },

  inc: (value, options) => {
    return parseInt(value) + 1;
  },

  arrayValue: (array, index) => {
    return array[index];
  },

  incArray: (value, options) => {
    return arrayValue(value, options + 1);
  },

  decArray: (value, options) => {
    return arrayValue(value, options - 1);
  },

  is_zero: (value) => {
    return value === 0;
  },
  
};
