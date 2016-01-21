Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  // Listen to `submit` event on form
  Template.body.events({
    'submit .new-task': function (event) {
      event.preventDefault();
      var text = event.target.text.value;

      // Insert a task into the collection
      Tasks.insert({
        text: text,
        createdAt: new Date()
      });

      // Clear form
      event.target.text.value = "";
    }
  });

  Template.task.events({
    'click .toggle-checked': function () {
      Tasks.update(this._id, {
        $set: {checked: !this.checked}
      });
    },
    'click .delete': function () {
      Tasks.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
