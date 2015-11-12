if (Meteor.isClient) {

  function handleDragStart(e) {
        // Target (this) element is the source node.
        this.style.opacity = '0.4';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

  var players = document.querySelectorAll('#playerList .player');
  [].forEach.call(players, function(player) {
    player.addEventListener('dragstart', handleDragStart, false);
  });

  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.body.events({
    'dragstart': function(e) {
      console.log('got here');
      e.originalEvent.dataTransfer.setData('text/html',e.target.textContent);
    },
    'dragenter': function(e) {
      e.preventDefault();
    },
    'dragover': function(e) {
      e.preventDefault();
      console.log('dragover event fired');
    },
    'drop': function(e) {
      e.preventDefault();
      console.log('drop event fired');
      console.log('dropped ' + e.originalEvent.dataTransfer.getData('text/html') + ' onto position: ' + e.target.textContent);
    },
    'dragend': function(e) {
      console.log('dragend event fired');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
