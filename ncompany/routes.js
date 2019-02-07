const express = require("express");

const path = require("path");

const router = express.Router();

var mysql = require("mysql");

var bodyParser = require("body-parser");

var events = require("events");

var eventEmitter = new events.EventEmitter();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var pool = mysql.createPool({
  connectionLimit: "10",
  host: "********",
  user: "*******",
  password: "*******",
  database: "********"
});

var data = [];
var data1 = [];
var data2 = [];
var data3 = [];

router.get("/register", (req, res) =>
  res.sendFile(path.join(__dirname + "/CreateAccount.html"))
);

router.get("/login1", (req, res) =>
  res.sendFile(path.join(__dirname + "/companyLogin.html"))
);

router.get("/contact", (req, res) =>
  res.sendFile(path.join(__dirname + "/contact.html"))
);

router.get("/view2", (req, res) =>
  res.sendFile(path.join(__dirname + "/nCompanyView.html"))
);

//Event to trigger view Employment function from database
var empView = function v2() {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    var query = connection.query("SELECT * FROM updateemployment;");
    query
      .on("error", function(err) {
        if (err) {
          console.log(err);
        }
      })
      .on("fields", function(fields) {
        if (fields) {
          console.log(fields);
        }
      })
      .on("result", function(row) {
        if (row) {
          data.push(row);
        }
      });

    connection.release(function(error) {
      if (error) throw error;
    });
  });
};

eventEmitter.on("sing", empView);

router.post("/02", urlencodedParser, function(req, res) {
  eventEmitter.emit("sing");
  res.render("viewEmployment", { upload: data });
  data.length = 0;
});
//----------------------------------------------------
//end of router method to render employment data
//------------------------------------------------------

//Event to trigger view bank function
var view3 = function v3() {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    var query = connection.query("select * from updatebank");
    query
      .on("error", function(err) {
        console.log(err);
      })
      .on("result", function(row) {
        data1.push(row);
      });
    connection.release(function(error) {
      if (error) throw error;
    });
  });
};

eventEmitter.on("laugh", view3);

router.post("/04", urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  eventEmitter.emit("laugh");
  res.render("viewBank", { fill: data1 });
  data1.length = 0;
});
//-----------------------------------------
//above is end of router method to render bank details
//-----------------------------------------

router.post("/100", urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query(
      "UPDATE updatepersonal SET name = '" +
        req.body.name +
        "', dob = '" +
        req.body.dob +
        "', gender = '" +
        req.body.gender +
        "', email = '" +
        req.body.email +
        "', mnumber = '" +
        req.body.mnumber +
        "', kin = '" +
        req.body.kin +
        "', kinrelationship = '" +
        req.body.kinrelationship +
        "', kinemail = '" +
        req.body.kinemail +
        "', kinnumber = '" +
        req.body.kinnumber +
        "' WHERE idnumber = '" +
        req.body.idnumber +
        "'",
      function(error, results, fields) {
        if (error) {
          console.error(error);
        }
        if (results) {
          console.log(results);
          res.end("Updated");
        }
        if (fields) {
          console.log(fields);
        }
      }
    );
    connection.release(function(error) {
      if (error) throw error;
    });
  });
});

// Post method for create account
router.post("/register", urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query(
      "INSERT INTO create_account(cname,cemail,pword,rpword) VALUES('" +
        req.body.name +
        "','" +
        req.body.email +
        "','" +
        req.body.pword +
        "','" +
        req.body.rpword +
        "')",
      function(error, results, fields) {
        if (error) {
          console.error(error);
        }
        if (results) {
          console.log(results);
          res.sendFile(path.join(__dirname + "/CreateAccount.html"));
        }
        if (fields) {
          console.log(fields);
        }
      }
    );
    connection.release(function(error) {
      if (error) throw error;
    });
  });
});
//--------------------------------------------------------------------
//End of post method to create account
//---------------------------------------------------------------------

//POST Method for contact us.
router.post("/contact", urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query(
      "INSERT INTO contact_us(fname,lname,email,pnumber,country,city,subject) VALUES('" +
        req.body.fname +
        "','" +
        req.body.lname +
        "','" +
        req.body.email +
        "','" +
        req.body.pnumber +
        "','" +
        req.body.country +
        "','" +
        req.body.city +
        "','" +
        req.body.subject +
        "')",
      function(error, results, fields) {
        if (error) {
          console.error(error);
        }
        if (results) {
          console.log(results);
          res.sendFile(path.join(__dirname + "/contact.html"));
        }
        if (fields) {
          console.log(fields);
        }
      }
    );
    connection.release(function(error) {
      if (error) throw error;
    });
  });
});
//--------------------------------------------------------------
//end of post method for contact us
//--------------------------------------------------------------

//POST Method for updatePersonal.
router.post("/11", urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query(
      "INSERT INTO updatepersonal(name,idnumber,dob,gender,email,mnumber,kin,kinrelationship,kinemail,kinnumber) VALUES('" +
        req.body.name +
        "','" +
        req.body.idnumber +
        "','" +
        req.body.dob +
        "','" +
        req.body.gender +
        "','" +
        req.body.email +
        "','" +
        req.body.mnumber +
        "','" +
        req.body.kin +
        "','" +
        req.body.kinrelationship +
        "','" +
        req.body.kinemail +
        "','" +
        req.body.kinnumber +
        "')",
      function(error, results, fields) {
        if (error) {
          console.error(error);
          return;
        }
        if (results) {
          console.log(results);
          res.end();
        }
        if (fields) {
          console.log(fields);
        }
      }
    );
    connection.release(function(error) {
      if (error) throw error;
    });
  });
});

//POST method to view personal details

var event1 = function v1() {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    var query = connection.query("SELECT * FROM updatepersonal;");
    query
      .on("error", function(err) {
        if (err) {
          console.log(err);
        }
      })
      .on("result", function(row) {
        if (row) {
          data2.push(row);
        }
      });
    connection.release(function(error) {
      if (error) throw error;
    });
  });
};

eventEmitter.on("shout", event1);

router.post("/00", urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  eventEmitter.emit("shout");
  res.render("viewPersonal", { print: data2 });
  data2.length = 0;
});
//

//POST method to update employment
router.post("/12", urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query(
      "INSERT INTO updateemployment(name,position,doe,kra,empemail,empstatus,dol) VALUES('" +
        req.body.name +
        "','" +
        req.body.position +
        "','" +
        req.body.doe +
        "','" +
        req.body.kra +
        "','" +
        req.body.empemail +
        "','" +
        req.body.empstatus +
        "','" +
        req.body.dol +
        "')",
      function(error, results, fields) {
        if (error) {
          console.error(error);
          return;
        }
        if (results) {
          console.log(results);
          res.sendFile(path.join(__dirname + "/updateEmployment.html"));
          //res.sendFile(path.join(__dirname + "/updatePersonal.html"));
          return;
        }
        if (fields) {
          console.log(fields);
        }
      }
    );
    connection.release(function(error) {
      if (error) throw error;
    });
  });
});

//POST method to update bank
router.post("/13", urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query(
      "INSERT INTO updatebank(name,salary,empemail,bname,branch,accname,accnumber) VALUES('" +
        req.body.name +
        "','" +
        req.body.salary +
        "','" +
        req.body.empemail +
        "','" +
        req.body.bname +
        "','" +
        req.body.branch +
        "','" +
        req.body.accname +
        "','" +
        req.body.accnumber +
        "')",
      function(error, results, fields) {
        if (error) {
          console.error(error);
          return;
        }
        if (results) {
          console.log(results);
          //res.send("<p>Success</p>");
        }
        if (fields) {
          console.log(fields);
        }
      }
    );
    connection.release(function(error) {
      if (error) throw error;
    });
  });
});

module.exports = router;
