
$ = function(sel) {
    return document.querySelector(sel);
  };
  

  loadStorage();
  loadaccounts();
  branding();
  saveStorage();
  loadIssuerList();
  var version = {
    "no":"1.0.6",
    "major":"1",
    "minor":"0",
    "patch":"5"
}

  LoadTabs();

  function LoadTabs() {
    loadSettingsAccounts();
    versionInfo();
  }
  function versionInfo() {
    $(elements.settings["version-info"].major).innerHTML = version.major;
    $(elements.settings["version-info"].minor).innerHTML = version.minor;
    $(elements.settings["version-info"].patch).innerHTML = version.patch;
  }


  $("#settings-accounts-delate-diolog-erase").addEventListener("click", function(){ removeAccount(); });

  function loadSettingsAccounts() {
    $("#settings-accounts-table").innerHTML = "";
    for (var i = 0; i < storage.accounts.length; i++) {
        var account = storage.accounts[i];  
        Render_SettingsTabAccount(account);
    }
  }

  function Render_SettingsTabAccount(account) {
    var html = `<tr>
    <td>
        <div>
            <p>${account.label}<b> - ${account.date}</b></p>
            <i style="color: #f50057">${account.issuer}</i>
        </div>
    </td>
    <td>
        <div class="dropdown" style="margin-top: 10px">
            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Options
            </button>
            <div class="dropdown-menu btn-sm" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item btn-sm" style="color: red;" href="#" data-toggle="modal" data-target="#remove-account-model" onclick="removeAccountDiolog('${account.label}','${account.id}')">Remove Account</a>
            </div>
        </div>
    </td>
</tr>`;
    $("#settings-accounts-table").innerHTML = $(elements.settings.accounts.table).innerHTML + html;
  }

  function removeAccount() {
    var accountID = delateaccountID;
    var accountsARRAY = [];
    for (var i = 0; i < storage.accounts.length; i++) {
        var account = storage.accounts[i];  
        if (account.id == accountID) {
            console.log("Account removed: " + account.label)
        } else {
            console.log("Account saved: " + account.label)
            accountsARRAY.unshift(account);
        }
    }
    storage.accounts = accountsARRAY;
    saveStorage();
    LoadTabs();
    loadaccounts();
  }

  function removeAccountDiolog(accountLabel, accountID) {
    $("#settings-accounts-delete-name").innerHTML = accountLabel;
    delateaccountID = accountID;
  }
  
  function loadaccounts() {
    document.getElementById("accounts-panel").innerHTML = "";
    if (config.debug == true) {
        console.log(`%cLoading ${storage.accounts.length} Account/accounts`, `color: blue; font-size: 24px;`)
    }
    for (var i = 0; i < storage.accounts.length; i++) {
        var account = storage.accounts[i];
        if (config.debug == true) {
            console.log(`%c ${account.label} : ${account.issuer}`, `color: green;`);
        }
  
        var colour;
        if (account.colour.custom == true) {
            colour = account.colour.hex;
        } else {
            colour = app.accounts.defaults.colour;
        }
        document.getElementById("accounts-panel").innerHTML = document.getElementById("accounts-panel").innerHTML + `<a class="btn account-card" data-toggle="collapse" href="#account-drop-${account.id}"
     role="button" aria-expanded="false" aria-controls="collapseExample">
    <blockquote class="blockquote" style="border-left: 0.3125rem solid ${colour};">
        <div>
            <img width="50px" height="50px" class="company-icon" data-toggle="tooltip" data-placement="top" title="${account.label}" src="${GetCompanyLogo(account.company)}">
        </div>
        <div>
            <p class="mb-0 account-label" style="display:inline-block;vertical-align: middle;">${account.label}</p>
        </div>
       <footer class="blockquote-footer">${account.issuer} <cite title="Date">${account.date}</cite></footer>
    </blockquote>
  </a>
  <div class="collapse" id="account-drop-${account.id}">
  <div class="card card-body">
  <div id="account-${account.id}" style="text-algine: centre"><h1>3628394</h1></div>
  </div>
  </div>`;
        //gen_code(account.secret, `#account-${account.secret}`)
    }
    if (storage.accounts.length < 1) {
        document.getElementById("accounts-panel").innerHTML = `<a class="btn account-card" data-toggle="collapse" href="#account-drop-44"
    role="button" aria-expanded="false" aria-controls="collapseExample">
   <blockquote class="blockquote" style="border-left: 0.3125rem solid ${app.accounts.defaults.colour};">
       <div>
           <img width="50px" height="50px" class="company-icon" src="${GetCompanyLogo(app.accounts.defaults.icon)}">
       </div>
       <div>
           <p class="mb-0 account-label" style="display:inline-block;vertical-align: middle;">No Accounts Yet</p>
       </div>
      <footer class="blockquote-footer">Edgy Auth Team.<cite title="Date"></cite></footer>
   </blockquote>
  </a>
  <div class="collapse" id="account-drop-44">
  <div class="card card-body">
  <div id="account-5" style="text-algine: centre"><h5>You havent added any acounts yet. to add an account goto the New Account panel and add a account.</h5></div>
  </div>
  </div>`;
  
    }
  }
  
  function branding() {//$("#brand_title").innerText = app.name;
  }
  
  String.prototype.hexEncode = function() {
    var hex, i;
  
    var result = "";
    for (i = 0; i < this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000" + hex).slice(-4);
    }
  
    return result
  }
  
  var element = "#code-1"
  var totp = new jsOTP.totp();
  var code = totp.getOtp("23TplPdS46Juzcyx");
  var secret = "23TplPdS46Juzcyx";
  var updateTicker = function(tick, el) {
      var percent = tick / 30 * 100

      console.log(percent)
      $("#sec-timer-progress").setAttribute("style", `width: ${percent}%`);
  }
  
  var updateTotp = function(secret, el) {
    for (var i = 0; i < storage.accounts.length; i++) {
        var account = storage.accounts[i];
  
        var totpcode;
  
        try {
          eval("totpcode = totp.getOtp(account.secret);")
        }
        catch(error) {
          totpcode = "Invalid OTP";
        }
  
        if (config.debug == true) {
            console.log(i)
            console.log(`${totpcode}   ${account.label}`)
        }
        document.getElementById("account-" + account.id).innerHTML = `<button type="button" class="btn btn-outline-info token" onclick="copyCode('${totpcode}')"><h1 class="">${totpcode}</h1></button>`;
    }
    if (config.debug == true) {
  
    }
    //el.innerText = totp.getOtp(secret);
  }
  
  updateTotp(secret, $(element));
  
  var timeLoop = function() {
    var epoch = Math.round(new Date().getTime() / 1000.0);
    var countDown = 30 - (epoch % 30);
    updateTicker(countDown, $('#couneter-top'));
    if (epoch % 30 == 0)
        updateTotp(secret, $(element)
        );
  
  }
  setInterval(timeLoop, 1000);
  //count down timer end
  
  const copyToClipboard = str=>{
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
  ;
  
  function copyCode(token) {
  
    copyToClipboard(token)
    Snackbar.show({
        actionTextColor: '#ff0000',
        text: "Copied text!",
        duration: 2000
    });
  }
  
  function loadStorage() {
    if (localStorage.getItem("storage") != null) {
        storage = JSON.parse(localStorage.getItem("storage"));
    } else {
    }
  }
  function saveStorage() {
    localStorage.setItem("storage", JSON.stringify(storage));
  
  }
  
  function NewAccountIssuer(issuer) {
    NewAccont.issuer = issuer;
    $("#new-account-issuer-name").innerHTML = issuer;
  }
  
  function loadIssuerList() {
    Object.keys(companys).forEach(function(key) {
        if (config.debug == true) {
            console.log(key, companys[key]);
        }
        var name = key;
        $("#new-account-issuer-list").innerHTML = $("#new-account-issuer-list").innerHTML + (`<li class="list-group-item"><button type="button" onclick="NewAccountIssuer('${key}');" class="btn btn-outline-secondary" style="width: 100%;"><img src="${companys[key]}" height="25px;">${name}</button></li>`)
    });
  }
  
  function AddAccount() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    //January is 0!
  
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
  
    var today = dd + '/' + mm + '/' + yyyy;
  
    NewAccont.id = Math.random().toString(36).substr(2, 9);
    NewAccont.label = $("#new-account-issuer-name").innerHTML;
    NewAccont.secret = $("#new-account-secret").value;
    NewAccont.label = $("#new-account-name").value;
    NewAccont.company = $("#new-account-issuer-name").innerHTML;
    NewAccont.date = today;
  
    var n = {
      "id":Math.random().toString(36).substr(2, 9),
      "issuer":$("#new-account-issuer-name").innerHTML,
      "label":$("#new-account-name").value,
      "secret":$("#new-account-secret").value,
      "otpauth":"",
      "company":$("#new-account-issuer-name").innerHTML,
      "colour":{
          "custom": false,
          "hex":"#01acec"
      },
      "date":today,
      "erased":false
    }
  
    if (config.debug == true) {
        console.log(NewAccont)
    }
    if (config.debug == true) {
        console.log(storage.accounts)
    }
    if (config.debug == true) {
      console.log(n)
  }
  
    storage.accounts.unshift(n);
    $("#accounts-panel").innerHTML = " ";
    loadaccounts();
    saveStorage();
    updateTotp();
    loadSettingsAccounts();
  }
  