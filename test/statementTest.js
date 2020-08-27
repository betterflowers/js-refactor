const test = require('ava');
const {statement} = require('../src/statement');


test('Amount should be $0.00 when the performances is empty ', t => {

  const invoice = {
    'customer': 'Karol',
    'performances': [],
  };

  const result = statement(invoice, plays);

  t.is(result, 'Statement for Karol\n' +
      'Amount owed is $0.00\n' +
      'You earned 0 credits \n');
});


const invoice = {
  'customer': 'BigCo',
  'performances': [
    {
      'playID': 'hamlet',
      'audience': 55,
    },
    {
      'playID': 'as-like',
      'audience': 35,
    },
    {
      'playID': 'othello',
      'audience': 40,
    },
  ],
};


const plays = {
  'hamlet': {
    'name': 'Hamlet',
    'type': 'tragedy',
  },
  'as-like': {
    'name': 'As You Like It',
    'type': 'comedy',
  },
  'othello': {
    'name': 'Othello',
    'type': 'tragedy',
  },
};