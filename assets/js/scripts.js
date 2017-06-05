$('document').ready(function(){

  var latestUrl = "http://acadprojects.com/py/notes/sharing/note";
  getNotes(latestUrl);

  function getNotes(dataUrl)
  {
      $("#loader").css('display','block');
    $.ajax({
      url: dataUrl,
      type:"GET",
      success: function(result){
        console.log(result);

        $("#studyMaterials tbody").empty();
        $("#questionPapers tbody").empty();
        $("#projectReports tbody").empty();

         var newNotes = result.notes;
         console.log(newNotes);

         var length = newNotes.length;

         var countStudyMaterial = 0;
         var countQuestionPaper = 0;
         var countProjectReport = 0;

         for (var i = 0; i<length; i++)
         {
          var noteObject = newNotes[i];

          var notesName = noteObject.doc_name;
          var description = noteObject.doc_description;
          var subject = noteObject.subject.subject;
          var url = noteObject.doc_url;

           var type= noteObject.document_type;

          if(type =='Study Material')
          {
              countStudyMaterial++;
              $('#studyMaterials tbody').append('<tr> <td> '+countStudyMaterial+' </td> <td> '+notesName+' </td> <td> '+description+' </td> <td> '+subject+' </td> <td><a target="_blank" href="'+url+'"> download</a></td> </tr>');
          }

          else if(type == 'Project Report')
          {
              countProjectReport++;
              $('#projectReports tbody').append('<tr> <td> '+countProjectReport+' </td> <td> '+notesName+' </td> <td> '+description+' </td> <td> '+subject+' </td> <td><a target="_blank" href="'+url+'"> download</a></td> </tr>');
          }

          else if(type == 'Question Papers')
          {
              countQuestionPaper++;
              $('#questionPapers tbody').append('<tr> <td> '+countQuestionPaper+' </td> <td> '+notesName+' </td> <td> '+description+' </td> <td> '+subject+' </td> <td><a target="_blank" href="'+url+'"> download</a></td> </tr>');
          }



        }

        $("#loader").css('display','none');

      }});
  }



    $('#arts').on('click',function(){

      $("#notesNavigation ul li").removeClass('active');
      $(this).parent().addClass('active');

      var url = "http://acadprojects.com/py/notes/sharing/note?category=arts";
      getNotes(url);
    });


    $('#engineering').on('click',function(){
      $("#notesNavigation ul li").removeClass('active');
      $(this).parent().addClass('active');

      var url = "http://acadprojects.com/py/notes/sharing/note?category=engineering";
      getNotes(url);
    });


    $('#science').on('click',function(){
      $("#notesNavigation ul li").removeClass('active');
      $(this).parent().addClass('active');

      var url = "http://acadprojects.com/py/notes/sharing/note?category=science";
      getNotes(url);
    });

    $('#maths').on('click',function(){
      $("#notesNavigation ul li").removeClass('active');
      $(this).parent().addClass('active');

      var url = "http://acadprojects.com/py/notes/sharing/note?category=mathematics";
      getNotes(url);
    });


    $('#latest').on('click',function(){
      $("#notesNavigation ul li").removeClass('active');
      $(this).parent().addClass('active');

      var url = "http://acadprojects.com/py/notes/sharing/note";
      getNotes(url);
    });



    $("#submitBtn").on('click',function(){

      var docName = $("#fileName").val();
      var docDescription = $("#description").val();
      var subject = $("#subject").val();
      var documentType = $("#documentType").val();

      var myFile = $("input[type=file]")[0].files[0];

      if(docName ==  undefined || docName =="")
      {
        alert("please fill Document Name");
        return false;
      }

      if(docDescription ==  undefined || docDescription =="")
      {
        alert("please fill Document Description");
        return false;
      }

      // if(subject ==  undefined || subject =="")
      // {
      //   alert("please select subject type");
      //   return false;
      // }
      //
      // if(documentType ==  undefined || documentType =="")
      // {
      //   alert("please select Document type");
      //   return false;
      // }

      if(myFile ==  undefined || myFile =="")
      {
        alert("please file to upload");
        return false;
      }

         $("#loader").css('diaplay', 'block');

      var formdata = new FormData();

      formdata.append("file", myFile);
      formdata.append("doc_description",docDescription);
      formdata.append("document_type", documentType);
      formdata.append("doc_name", docName);
      formdata.append("category", subject);


      $.ajax({
        url:'http://acadprojects.com/py/notes/sharing/note',
        data: formdata,
        type: 'POST',
        contentType: false,
        processData: false,
        success: function(result)
        {
          alert("submitted");

          $("#loader").css('diaplay', 'none');
          location.reload();
        }
      });

    });



 });
