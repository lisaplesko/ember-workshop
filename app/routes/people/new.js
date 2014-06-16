import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('person');
  },
  actions: {
    create: function() {
      var routeContext = this;

      this.controller.get('model').save().then(function() {
        routeContext.transitionTo('people');
      });
    },
    // willTransition: function(transition) {
    //   var model = this.get('controller.model');
    //   if (model.get('isDirty') && !confirm('You have unsaved changes. They will be lost if you continue!')) {
    //   // isDirty - has anything changed?
    //     transition.abort();
    //   }
  },
  deactivate: function() {
    // called ANYTIME you leave this route
    // NOT called if you refer to a child route
    var model = this.get('controller.model');
    model.rollback();
    if (model.get('isNew')) {
      model.deleteRecord();
    }
  }
});

// We go to create a new record, decide we dont' want to create it.
// Want to detect whether the record has been persisted or not.
