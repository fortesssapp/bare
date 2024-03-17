import firestore from "@react-native-firebase/firestore";

// add settings

class DB {
  constructor(table = "") {
    if (table) {
      this.table = table;
      this.collection = firestore().collection(this.table);
      this.limits = 50;
    }

    return this;
  }
  // create
  async create(object = {}) {
    try {
      // obtain the id
      const docId = this.collection.doc().id;
      // update incoming object details
      const obj = {...object, _id: docId};
      // set the document
      await this.collection.doc(docId).set(obj);
      return docId;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // read
  async read(
    limit = 50,
    search = [{ key: "", Value: "", operator: "==" }],
    after = {},
    order_by = { order: "", by: "asc" },
    end = {},
  ) {
    const result = [];
    // get the db
    // start at
    // end at
    // limit
    // index, values in array
    // compose the path
    let db_handle = firestore().collection(this.table);

    if (search.length) {
      search.forEach((w) => {
        db_handle.where(w.key, w.operator, w.Value);
      });
    }

    if (Object.keys(after).length) {
      db_handle.startAfter(start);
    }

    if (Object.keys(end).length) {
      db_handle.endAt(start);
    }

    if (limit) {
      db_handle.limit(limit);
    }

    if (order_by) {
      db_handle.orderBy(order_by.order, order_by.by);
    }

    const results = await db_handle.get();

    results.forEach((snapshot) => {
      if (snapshot.exists()) {
        result.push({
          key: snapshot.id,
          ...snapshot.data(),
        });
      }
    });

    return result;
  }

  // update
  async update(object = {}, Id = "") {
    try {
      await this.collection.doc(Id).update(object);
      return true;
    } catch (error) {
      return false;
    }
  }

  // delete
  delete(Id) {
    return this.collection.doc(Id).delete();
  }
}

export const Database = DB;
