import eventEmitter from "../EventEmitter";
import { CurrencyItem } from "../interface/CurrencyItem";
import userChoice from "../maps/UserChoice.map";

const currencies: CurrencyItem[] = [
  { currency: "eur", value: "0.92" }, // Euro
  { currency: "gbp", value: "0.78" }, // British Pound
  { currency: "chf", value: "0.90" }, // Swiss Franc
  { currency: "sek", value: "10.93" }, // Swedish Krona
  { currency: "nok", value: "10.70" }, // Norwegian Krone
  { currency: "dkk", value: "6.88" }, // Danish Krone
  { currency: "pln", value: "4.13" }, // Polish Zloty
  { currency: "czk", value: "22.97" }, // Czech Koruna
  { currency: "huf", value: "360.00" }, // Hungarian Forint
  { currency: "ron", value: "4.58" }, // Romanian Leu
  { currency: "bgn", value: "1.80" }, // Bulgarian Lev
  { currency: "hrk", value: "7.00" }, // Croatian Kuna
  { currency: "rub", value: "96.00" }, // Russian Ruble
  { currency: "isk", value: "137.50" }, // Icelandic Krona
  { currency: "uah", value: "36.70" }, // Ukrainian Hryvnia
  { currency: "try", value: "28.80" }, // Turkish Lira
  { currency: "rsd", value: "110.00" }, // Serbian Dinar
  { currency: "mdl", value: "17.60" }, // Moldovan Leu
  { currency: "bam", value: "1.80" }, // Bosnia and Herzegovina Convertible Mark
  { currency: "mkd", value: "57.30" }, // Macedonian Denar
];

export const latestRates = {
  currencies,
  timeStamp: new Date().toISOString(),
};

function updateCurrencies() {
  console.log(latestRates.currencies, latestRates.timeStamp, userChoice);
  const freshRates = latestRates.currencies.map((currency) => {
    const randomFactor = Math.random() * 0.2 - 0.1; // Random between -0.1 and 0.1
    const updatedValue = Number(currency.value) * (1 + randomFactor);

    // Return the updated currency object with the new value rounded to 4 decimal places
    return {
      ...currency,
      value: updatedValue.toFixed(4),
    };
  });

  latestRates.currencies = freshRates;
  latestRates.timeStamp = new Date().toISOString();

  eventEmitter.emit("rates-change");
}

setInterval(updateCurrencies, 10000);
