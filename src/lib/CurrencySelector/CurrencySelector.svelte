<script lang="ts">
  export let currencies = [];
  export let selectedCurrency;
  export let id;
</script>

<select data-testid="test" {id} on:change>
  {#each currencies as currency}
    <option selected={selectedCurrency === currency} value={currency}
      >{currency.toUpperCase()}</option
    >
  {/each}
</select>
