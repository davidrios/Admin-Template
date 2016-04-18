!function() {
  var menuElement = document.querySelector('body > nav:first-child');
  function menuToggleClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    menuElement.classList.toggle('show');
  }

  document
    .getElementById('menu-toggle')
    .addEventListener('click', menuToggleClick);

  document
    .getElementById('menu-close')
    .addEventListener('click', menuToggleClick);

  document.addEventListener('click', function(ev) {
    menuElement.classList.remove('show');
  });

  // MENU ITEMS
  var menuListItems = menuElement.querySelectorAll('ul > li');

  function handleMenuItemClick(ev) {
    for (var i = 0; i < menuListItems.length; i++) {
      var li = menuListItems[i];
      var link = li.children[0];
      if (ev.target === link) {
        li.classList.add('active');
      }
      else {
        li.classList.remove('active');
      }
    }
  }

  var location = window.location.toString();
  var activeIdx = null;
  for (var i = 0; i < menuListItems.length; i++) {
    var li = menuListItems[i];
    var link = li.children[0];

    if (activeIdx === null) {
      activeIdx = i;
    }

    if (li.classList.contains('active') || link.href === location) {
      activeIdx = i;
    }

    link.dataset.position = i;
    link.addEventListener('click', handleMenuItemClick);
  }

  var activeLink = menuListItems[activeIdx].children[0];
  handleMenuItemClick({target: activeLink});
  if (location !== activeLink.href) {
    window.location = activeLink.href;
  }
  // END MENU ITEMS

  // CONTENT
  function handleHashChange(ev) {
    var hash = ev.newURL.substr(ev.newURL.indexOf('#'));
    var sections = document.querySelectorAll('body > section');
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      if (section.dataset.link === hash) {
        section.classList.add('active');
      }
      else {
        section.classList.remove('active');
      }
    }
  }

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange({newURL: window.location.toString(), oldURL: null});
  // END CONTENT

  // TAGS INPUT
  var tagsInputs = document.querySelectorAll('ul.tags-input');
  for (var i = 0; i < tagsInputs.length; i++) {
    !function() {
      var tagsInput = tagsInputs[i];
      var textField = tagsInput.querySelector('input');

      tagsInput.addEventListener('click', function(ev) {
        textField.focus();
      });

      textField.addEventListener('blur', function(ev) {
        tagsInput.classList.remove('active');
      });

      textField.addEventListener('focus', function(ev) {
        tagsInput.classList.add('active');
      });
    }();
  }
  // END TAGS INPUT

  // MODIFIERS INPUT
  var modifiersInputs = document.querySelectorAll('ul.modifiers-input');
  for (var i = 0; i < modifiersInputs.length; i++) {
    var modifiersInput = modifiersInputs[i];

    for (var j = 0; j < modifiersInput.children.length; j++) {
      !function() {
        var item = modifiersInput.children[j];
        var inputs = item.querySelectorAll('input');

        item.querySelector('ul').addEventListener('click', function(ev) {
          inputs[1].focus();
        });

        for (var k = 0; k < inputs.length; k++) {
          inputs[k].addEventListener('blur', function(ev) {
            item.classList.remove('active');
          });

          inputs[k].addEventListener('focus', function(ev) {
            item.classList.add('active');
          });
        }
      }();
    }
  }
  // END MODIFIERS INPUT

  // SEARCHABLE SELECT
  var searchableSelects = document.querySelectorAll('div.searchable-select');
  for (var i = 0; i < modifiersInputs.length; i++) {
    !function() {
      var select = searchableSelects[i];
      var ul = select.querySelector('ul');
      var input = select.querySelector('input');

      select.addEventListener('click', function(ev) {
        if (ev.target !== input) {
          ul.classList.toggle('visible');
          if (ul.classList.contains('visible')) {
            input.focus();
          }
        }
      });
    }();
  }
  // END SEARCHABLE SELECT
}();