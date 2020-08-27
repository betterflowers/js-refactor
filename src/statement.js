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
  thisCredits += Math.max(perf.audience - 30, 0);
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

function printOutput(play, thisAmount, perf) {
  const format = formatUSD();
  return ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
}

function getFinalResultOutput(invoice, plays, volumeCredits) {
  let totalAmount = 0;
  const format = formatUSD();
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = countAmountByPlayType(play, perf);
    result += printOutput(play, thisAmount, perf);
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

function getVolumeCredits(invoice, plays) {
  let volumeCredits = 0;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisCredits = countCredits(perf, play);
    volumeCredits += thisCredits;
  }
  return volumeCredits;
}

function statement (invoice, plays) {
  let volumeCredits = getVolumeCredits(invoice, plays);
  let result = getFinalResultOutput(invoice, plays, volumeCredits);
  return result;
}

module.exports = {
  statement,
};
