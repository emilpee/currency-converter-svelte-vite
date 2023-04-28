<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";

  import dummyData from "../data/currencyData.json";
  import CurrencyInput from "./CurrencyInput.svelte";
  import CurrencySelector from "./CurrencySelector.svelte";
  import Output from "./Output.svelte";

  let currencies = ["SEK", "GBP", "USD"];
  const { VITE_CURRENCY_API_ENDPOINT } = import.meta.env;

  onMount(() => {
    const getCurrencies = async () =>
      await axios.get(VITE_CURRENCY_API_ENDPOINT);
    if (currencies.length === 0)
      getCurrencies()
        .then(({ data }) => (currencies = data))
        .catch((e) => console.error("Error fetching currencies: ", e));
  });

  let currency1 = "eur";
  let currency2 = "sek";
  let value1: number = 1;
  let value2: number;

  const compareCurrencies = (rate1, rate2) => rate1 / rate2;

  onMount(() => {
    const [_, currencyValue] = getCurrentValue(currency2);
    value2 = compareCurrencies(currencyValue, value1);
  });

  const getCurrentValue = (c: string) => {
    return Object.entries(dummyData.eur).find(([currency]) => currency === c);
  };

  const onInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;

    if (target.id === "1") {
      value1 = Number(target.value);
      const [_, currencyValue] = getCurrentValue(currency2);
      value2 = currencyValue * value1;
    } else if (target.id === "2") {
      value2 = Number(target.value);
      const [_, currencyValue] = getCurrentValue(currency2);
      value1 = compareCurrencies(value2, currencyValue);
    }
  };

  const onCurrencyChange = (e: Event) => {
    const target = e.target as HTMLInputElement;

    if (target.id === "1") {
      currency1 = target.value;
      const [_, currencyVal] = getCurrentValue(currency1);
      value1 = compareCurrencies(currencyVal, value2) * value2;
    } else if (target.id === "2") {
      currency2 = target.value;
      const [_, currencyVal] = getCurrentValue(currency2);
      value2 = compareCurrencies(currencyVal, value1) * value1;
    }
  };
</script>

<div class="currency">
  {#each ["1", "2"] as id}
    <div>
      <CurrencySelector
        {id}
        currencies={Object.keys(dummyData.eur)}
        selectedCurrency={id === "1" ? currency1 : currency2}
        on:change={(e) => onCurrencyChange(e)}
      />
      <CurrencyInput
        {id}
        num={id === "1" ? value1 : value2}
        on:change={(e) => onInputChange(e)}
      />
    </div>
  {/each}
</div>

<div class="output">
  <Output sum={value2} />
</div>

<style>
  .currency {
    display: flex;
    flex-direction: column;
  }
</style>
