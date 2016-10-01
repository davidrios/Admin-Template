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

  document
    .getElementById('input5')
    .addEventListener('focus', function(ev) {
      ev.target.nextElementSibling.classList.add('visible');
    })

  document
    .getElementById('input5')
    .addEventListener('blur', function(ev) {
      ev.target.nextElementSibling.classList.remove('visible');
    })

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

  document
    .getElementById('image-tags')
    .querySelector('input')
    .addEventListener('focus', function(ev) {
      document
        .getElementById('image-tags')
        .nextElementSibling.classList.add('visible');
    })

  document
    .getElementById('image-tags')
    .querySelector('input')
    .addEventListener('blur', function(ev) {
      document
        .getElementById('image-tags')
        .nextElementSibling.classList.remove('visible');
    })
  // END TAGS INPUT

  // MODIFIERS INPUT
  var modifiersInputs = document.querySelectorAll('ul.modifiers-input');
  for (var i = 0; i < modifiersInputs.length; i++) {
    var modifiersInput = modifiersInputs[i];

    for (var j = 0; j < modifiersInput.children.length; j++) {
      !function() {
        var item = modifiersInput.children[j];
        var inputs = item.querySelectorAll('input');

        if (item.querySelector('ul') == null) {
          return;
        }

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

  // DATE/TIME INPUT
  var dateInputs = document.querySelectorAll('div.datetime-input.date');
  for (var i = 0; i < dateInputs.length; i++) {
    !function() {
      var dateInput = dateInputs[i];
      var input = dateInput.querySelector('input');
      var calendar = dateInput.querySelector('div.calendar');
      var mobileBackground = dateInput.querySelector('div.mobile-background');

      dateInput.addEventListener('click', function(ev) {
        if (ev.target === dateInput) {
          input.focus();
        }
      });

      input.addEventListener('focus', function(ev) {
        calendar.classList.add('visible');
        mobileBackground.classList.add('visible');
      });

      for (var el of dateInput.querySelectorAll('a[data-action="cancel"], a[data-action="ok"]')) {
        el.addEventListener('click', function(ev) {
          ev.preventDefault();
          calendar.classList.remove('visible');
          mobileBackground.classList.remove('visible');
        });
      }
    }();
  }
  // END DATE/TIME INPUT
}();