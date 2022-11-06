import Vue from 'vue'

let vm = new Vue()
export default {
  checkListFieldsEmpty(list) {
    console.log(list)
    return new Promise((resolve, reject) => {
      if (list.length == 0) {
        return resolve(true)
      }
      for (const item of list) {
        if (Object.keys(item).length == 0) {
          return resolve(true)
        }
        for (var key in item) {
          if (item[key] == null) {
            return resolve(true)
          }
        }
      }
      return resolve(false)
    })
  },
  checkObjFieldsEmpty(obj) {
    return new Promise((resolve, reject) => {
      if (!obj || Object.keys(obj).length == 0) {
        resolve(true)
      }
      for (var key in obj) {
        if (!obj[key]) {
          resolve(true)
        }
      }
      resolve(false)
    })
  }
}
