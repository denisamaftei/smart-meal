<template>
  <q-page-container class="newProductPage-container">
    <div class="q-pa-md row justify-center">
      <q-layout view="lHh Lpr lFf">
        <q-header>
          <div class="q-pa-md">
            <div class="q-gutter-md">
              <SideMenu></SideMenu>
              <img src="../assets/Logo.svg" />
            </div>
          </div>
        </q-header>
        <div class="add-section-title">
          <div class="page-title">Checklist</div>
        </div>
        <div class="flex-center">
          <div class="checklist-container">
            <q-input
              v-model="newTask"
              @keyup.enter="addTask()"
              class="col"
              square
              filled
              bg-color="white"
              placeholder="Type what do you want to buy"
              dense
            >
              <template v-slot:append>
                <q-btn
                  @click="addTask()"
                  round
                  dense
                  flat
                  icon="add"
                  class="add-icon"
                />
              </template>
            </q-input>

            <q-item
              v-for="task in tasks"
              :key="task.uid"
              @click="
                updateDoneState(task.id, !task.done), (task.done = !task.done)
              "
              clickable
            >
              <q-item-section avatar>
                <q-checkbox
                  v-model="task.done"
                  class="no-pointer-events"
                  color="primary"
                />
              </q-item-section>
              <q-item-section :class="{ 'cut-text': task.done }">
                {{ task.title }}
              </q-item-section>
              <q-item-section v-if="task.done" side>
                <q-btn
                  @click.stop="deleteTask(task.id)"
                  flat
                  round
                  dense
                  color="primary"
                  icon="delete"
                />
              </q-item-section>
            </q-item>
          </div>
        </div>
        <div v-if="!tasks.length" class="no-tasks">
          <q-icon name="check" size="100px" color="primary"> </q-icon>
          <div class="text-h5 text-primary text-center">
            Nothing to buy yet.
          </div>
        </div>
      </q-layout>
    </div>
  </q-page-container>
</template>
<script>
import SideMenu from "src/components/SideMenu.vue";
import { ref } from "vue";
import { uuid } from "vue-uuid";
import firebaseConfig from "../firebase";

const db = firebaseConfig.db;
let taskId = "";
export default {
  components: { SideMenu },
  data() {
    return {
      newTask: "",
      tasks: [],
    };
  },
  setup() {
    return {
      selection: ref(["", "test"]),
      text: ref(""),
      ph: ref(""),
      dense: ref(false),
    };
  },

  methods: {
    deleteTask(index) {
      // this.$q
      //   .dialog({
      //     title: "Confirm",
      //     message: "Are you",
      //     cancel: true,
      //     persistent: true,
      //     style: "font-family: customFont",
      //     class: "dialog",
      //   })
      //   .onOk(() => {
      db.collection("items")
        .doc(index)
        .delete()
        .then(() => {
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
      let newArray = this.tasks.filter((item) => {
        return !(item.id === index);
      });

      this.tasks = newArray;

      this.$q.notify("Item deleted.");
      // });
    },
    updateDoneState(taskId, taskStatus) {

      db.collection("items")
        .doc(taskId)
        .update({ done: taskStatus })
        .then(() => {
        });
    },
    addTask() {
      let newId = uuid.v1();
      this.tasks.push({
        title: this.newTask,
        done: false,
        id: newId,
      });

      db.collection("items")
        .add({
          title: this.newTask,
          done: false,
          id: newId,
        })
        .then(() => {
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      this.newTask = "";
    },
    readListItems() {},
  },
  mounted() {
    db.collection("items")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.tasks.push({
            title: doc.data().title,
            done: doc.data().done,
            id: doc.id,
          });
        });
        return this.tasks;
      })
      .catch((error) => {
      });
  },
  beforeMount() {
    this.readListItems();
  },
};
</script>
<style lang="scss" scoped>
.q-gutter-md {
  display: flex;
  justify-content: space-between;
}
.page-title {
  color: #f78250;
  font-size: 2.5em;
  font-weight: 800;
  padding-top: 10vh;
}

.add-section-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.q-item__section {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}

.no-tasks {
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: inherit;
  margin-top: 15vh;
}
.q-item {
  display: flex;
  align-items: center;
}
.add-icon {
  color: #f78250;
}
.col {
  // background-color: #257394;
  margin-top: 2vh;
}
.cut-text {
  text-decoration: line-through;
}
@media only screen and (min-width: 768px) {
  .checklist-container {
    width: 50%;
  }
  .flex-center {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
