function formatUSD() {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
  return format;
}

function countCredits(perf, play) {
  let thisCredits = 0;
  // add volume credits
  thisCredits += Math.max(perf.audience - 30, 0);
  // add extra credit for every ten comedy attendees
  if ('comedy' === play.type) thisCredits += Math.floor(perf.audience / 5);
  return thisCredits;
}

function countAmountByPlayType(play, perf) {
  let thisAmount = 0;
  switch (play.type) {
    case 'tragedy':
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case 'comedy':
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
      default:
        throw new Error(`unknown type: ${play.type}`);
  }
  return thisAmount;
}

function printOutput(play, format, thisAmount, perf) {
  return ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
}

function statement (invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  const format = formatUSD();
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = countAmountByPlayType(play, perf);
    let thisCredits = countCredits(perf, play);
    volumeCredits += thisCredits;
    //print line for this order
    result += printOutput(play, format, thisAmount, perf);
    totalAmount += thisAmount;
  }

  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

module.exports = {
  statement,
};
