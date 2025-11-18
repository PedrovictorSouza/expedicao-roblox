class IDEGridObserver {
  constructor() {
    this.observers = []
  }

  subscribe(observer) {
    this.observers.push(observer)
    return () => {
      this.observers = this.observers.filter(obs => obs !== observer)
    }
  }

  notify(event, data) {
    this.observers.forEach(observer => {
      if (observer[event]) {
        observer[event](data)
      }
    })
  }

  notifyObjectAdded(object) {
    this.notify('onObjectAdded', object)
  }

  notifyObjectRemoved(objectId) {
    this.notify('onObjectRemoved', objectId)
  }

  notifyObjectUpdated(object) {
    this.notify('onObjectUpdated', object)
  }

  notifyObjectSelected(object) {
    this.notify('onObjectSelected', object)
  }
}

export const ideGridObserver = new IDEGridObserver()

