$(function() {
  var model = {
    students: [
      {
        name      : "Lilly",
        attendance: [false, false, false, false, false, false, false, false, false, false, false, false],
        missed    : 12
      }, {
        name      : "Ingo",
        attendance: [false, false, false, false, false, false, false, false, false, false, false, false],
        missed    : 12
      }, {
        name      : "Claudi",
        attendance: [false, false, false, false, false, false, false, false, false, false, false, false],
        missed    : 12
      }, {
        name      : "Sarah",
        attendance: [false, false, false, false, false, false, false, false, false, false, false, false],
        missed    : 12
      }
    ]
  };


  var view = {
    init: function() {
      this.students = controller.getAllStudents();
      this.$table   = $("#attendance-table");
      this.render();
    },

    render: function() {
      var students  = this.students;
      var $tbody    = $("#attendance-table-body");
      var rowBuffer = [];
      var attend, dayCells;

      $tbody.empty();

      rowBuffer = students.map(function(student) {
        var tr        = $("<tr />");
        var nameCol   = $("<td class='name-col'>" + student.name + "</td>");
        var missedCol = $("<td class='missed-col'>" + student.missed + "</td>");

        tr.append(nameCol);

        dayCells = student.attendance.map(function(attended, ix) {
          var td    = $("<td class='attend-col' />");
          var input = $("<input />", {
            "type": "checkbox"
          });
          if(attended) {
            input.attr('checked', 'checked');
          }
          input.on('click', function() {
            controller.updateStudent(student, ix);
          });
          td.append(input);
          tr.append(td);
        });
        tr.append(missedCol);
        return tr;
      });

      $tbody.append(rowBuffer);

    }
  };

  var controller = {
    init: function() {
      view.init();
    },

    updateStudent: function(student, day) {
      var students       = this.getAllStudents();
      var currentStudent = student;
      var i, attend;

      students = students.map(function(student) {
        var missed = 0;
        if(student.name === currentStudent.name) {
          currentStudent.attendance[day] = !currentStudent.attendance[day];
          currentStudent.attendance.map(function(attend) {
            if(!attend) {
              missed++;
            }
          });

          currentStudent.missed = missed;

          student = currentStudent;

        }
      });

      view.render();

    },

    getAllStudents: function() {
      return model.students;
    }
  };

  controller.init();
});