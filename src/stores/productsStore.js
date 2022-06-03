import { defineStore } from "pinia";
import { uuid } from "vue-uuid";

export const useRecipesStore = defineStore("products", {
  state: () => ({
    id: null,
  }),
  getters: {
    recipesCount: (state) => state.recipes.length,
    categoriesCount: (state) => state.categories.length,
  },
  actions: {
    createProduct(name, expirationDate, category) {
      productsCollection
        .add({
          expirationDate: expirationDate,
          name: name,
          category: category,
          uid: uuid.v1(),
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
    readProducts() {
      let productsData = [];
      db.collection("products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            productsData.push({
              id: doc.uid,
              name: doc.data().name,
              expirationDate: doc.data().expirationDate,
              category: doc.data().category,
            });
            console.log(doc.id, " => ", doc.data());
          });
          return productsData;
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    deleteProduct(id) {
      db.collection("products")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },

    readCategories() {
      let productsData = [];
      db.collection("categories")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            productsData.push({
              id: doc.uid,
              categoryName: doc.data().categoryName,
            });
            console.log(doc.id, " => ", doc.data());
          });
          return productsData;
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
  },
});
