<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <div class="q-pa-md">
        <div class="q-gutter-md">
          <img src="../assets/Logo.svg" />
        </div>
      </div>
    </q-header>
    <div class="page-title">Expiring Soon</div>
    <q-table
      class="expiring-table"
      :rows="rows"
      row-key="name"
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      :pagination="pagination"
      :rows-per-page-options="[0]"
      @virtual-scroll="onScroll"
      hide-pagination
    />
  </q-layout>
</template>
<script>
const rows = [
  {
    name: "Frozen Yogurt",
    category: "P",
    "exp Date": "11/12/2021",
  },
  {
    name: "Ice cream sandwich",
    category: "P",
    "exp Date": "10/12/2021",
  },
  {
    name: "Eclair",
    category: "P",
    "exp Date": "09/12/2021",
  },
  {
    name: "Cupcake",
    category: "P",
    "exp Date": "07/12/2021",
  },
  {
    name: "Gingerbread",
    category: "P",
    "exp Date": "30/12/2021",
  },
  {
    name: "Jelly bean",
    category: "P",
    "exp Date": "04/12/2021",
  },
  {
    name: "Lollipop",
    category: "P",
    "exp Date": "01/12/2021",
  },
  {
    name: "Honeycomb",
    category: "P",
    "exp Date": "05/12/2021",
  },
  {
    name: "Donut",
    category: "P",
    "exp Date": "23/12/2021",
  },
  {
    name: "KitKat",
    category: "P",
    "exp Date": "22/12/2021",
  },
];
export default {
  setup() {
    return { rows };
  },
};
</script>
<style lang="scss" scoped>
.page-title {
  color: #f78250;
  font-size: 2.5em;
  font-weight: 800;
  margin-top: 6%;
  padding-left: 16px;
}
.q-table__container {
  margin-left: 5%;
  margin-right: 5%;
  border-color: transparent;
  box-shadow: none;
}
</style>
<style>
.q-table thead {
  color: #f78250;
  font-weight: 900;
}
.text-left {
  text-align: center;
}
.q-table td {
  padding: 0;
}
</style>
