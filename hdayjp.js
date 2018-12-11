//
// hdayjp
// 2018-06-13
// 2014-12-20
//
if( !window.hdayjp ) {
  window.hdayjp = {};
}
// 1990-11-12 ENTHRN_CER
// resources
hdayjp._resources = {
  // Added on 2018-11-13.
  // Last modified on 2018-12-11 (Enthorement)
  // special holidays
  "1959-04-10": {"C": "The Marriage Ceremony of Prince Akihito", "ja": "皇太子明仁親王の結婚の儀", "ja_kana": "こうたいしあきひとしんのうけっこんのぎ"},
  "1989-02-24": {"C": "The Rites of an Imperial Funeral", "ja": "昭和天皇の大喪の礼", "ja_kana": "しょうわてんのうたいそうのれい"},
  "ENTHRN_DAY": {"C": "The Enthronement Day", "ja": "天皇の即位の日", "ja_kana": "てんのうのそくいのひ"},
  "ENTHRN_CER": {"C": "The Enthronement Ceremony", "ja": "即位の礼正殿の儀", "ja_kana": "そくいのれいせいでんのぎ"},
  "1993-06-09": {"C": "The Marriage Ceremony of Prince Naruhito", "ja": "皇太子・徳仁親王の結婚の儀", "ja_kana": "こうたいしなるひとしんのうけっこんのぎ"},
  // normal
  "NYD": {"C": "New Year\'s Day", "ja": "元日", "ja_kana": "がんじつ"},
  "CAD": {"C": "Caming-of-Age Day", "ja": "成人の日", "ja_kana": "せいじんのひ"},
  "EBD": {"C": "The Emperor\'s Birthday", "ja": "天皇誕生日", "ja_kana": "てんのうたんじょうび"},
  "CTD": {"C": "Constitution Day", "ja": "憲法記念日", "ja_kana": "けんぽうきねんび"},
  "CDD": {"C": "Children\'s Day", "ja": "こどもの日", "ja_kana": "こどものひ"},
  "CLD": {"C": "Culture Day", "ja": "文化の日", "ja_kana": "ぶんかのひ"},
  "LTD": {"C": "Labor Thanksgiving Day", "ja": "勤労感謝の日", "ja_kana": "きんろうかんしゃのひ"},
  "NFD": {"C": "National Foundation Day", "ja": "建国記念の日", "ja_kana": "けんこくきねんのひ"},
  "RAD": {"C": "Respect-for-the-Aged Day", "ja": "敬老の日", "ja_kana": "けいろうのひ"},
  "HSD": {"C": "Health and Sports Day", "ja": "体育の日", "ja_kana": "たいいくのひ"},
  "SPD": {"C": "Sports Day", "ja": "スポーツの日", "ja_kana": "すぽーつのひ"},
  "GRD": {"C": "Greenery Day", "ja": "みどりの日", "ja_kana": "みどりのひ"},
  "MRD": {"C": "Marine Day", "ja": "海の日", "ja_kana": "うみのひ"},
  "SWD": {"C": "Showa Day", "ja": "昭和の日", "ja_kana": "しょうわのひ"},
  "MTD": {"C": "Mountain Day", "ja": "山の日", "ja_kana": "やまのひ"},
  // Insert here if any holiday is added.
  "VED": {"C": "Vernal Equinox Day", "ja": "春分の日", "ja_kana": "しゅんぶんのひ"},
  "AED": {"C": "Autumn Equinox Day", "ja": "秋分の日", "ja_kana": "しゅうぶんのひ"},
  "NH": {"C": "National Holidy", "ja": "国民の休日", "ja_kana": "こくみんのきゅうじつ"},
  "HL": {"C": "A holiday in lieu", "ja": "振替休日", "ja_kana": "ふりかえきゅうじつ"},
  "NY": {"C": "New Year\'s Holiday", "ja": "年末年始", "ja_kana": "ねんまつねんし"}
};

// Locale. Only "ja" or "C" is avialable.
hdayjp._lc = "ja";

// ================================================
// irregular hdays for each year
// Added: 2018-06-13
// ================================================
hdayjp.irregularHDays = function(year, days) {
  this.year = year;
  this.days = days;
};

hdayjp.irregularHDays.prototype.calcTo = function(m, mdaytable) {
  var days = this.days;
  var len = days != null ? days.length : 0;
  var ret = [];
  for( var n = 0; n < len; n++ ) {
    var day = days[n];
    if( day.to[0] == m ) {
      var r = new hdayjp.Result(day.id, day.to[1]);
      ret.push(r);
      if( mdaytable != null ) {
        mdaytable[r.md] = r;
      }
    }
  }
  return ret;
};

hdayjp.irregularHDays.prototype.calcHit = function(id) {
  var days = this.days;
  var len = days != null ? days.length : 0;
  for( var n = 0; n < len; n++ ) {
    var day = days[n];
    if( day.id == id ) {
      return true;
    }
  }
  return false;
};

hdayjp.calcIrregularHdays = function(y) {
  var len = hdayjp._ihds != null ? hdayjp._ihds.length : 0;
  for( var n = 0; n < len; n++ ) {
    var ihd = hdayjp._ihds[n];
    if( ihd.year == y ) {
      return ihd;
    }
  }
  return null;
};

// ================================================
// Result Class
// ================================================
// --------------------------------
// Constructor
// Arguments:
//  id: id (2 or 3 characters) indicating each holiday.
//  md: Day of month. Starts with 1.
// --------------------------------
hdayjp.Result = function(id, md) {
  this.id = id;
  this.md = md;
}

// --------------------------------
//  Calculates name of the holiday.
//  If argument lc is null or not specified, this sets lc with hdayjp._lc.
//  If hdayjp._resources[this.id] does not contain the words which lc points,
//    this assumes lc is "C".
//  If hdayjp._resources[this.id] does not contain the words which "C" points,
//    this returns only id (2 or 3 characters text).
//  Arguments:
//    lc: Locale text. Currently, "C", "ja" or "ja_kana" is available.
//  Returned Value:
//    Name of the holiday, or id (2 or 3 characters text).
// --------------------------------
hdayjp.Result.prototype.getText = function(lc) {
  if( this.id == null ) {
    return null;
  }
  var r = hdayjp._resources[this.id];
  if( r != null ) {
    if( r[lc] != null ) {
      return r[lc];
    }
    if( r[hdayjp._lc] != null ) {
      return r[hdayjp._lc];
    }
    if( r["C"] != null ) {
      return r["C"];
    }
  }
  return this.id;
};

// ================================================
//  Entry Class
// ================================================
// --------------------------------
//  Constructor.
//  Arguments:
//    id: id (2 or 3 characters) indicating each holiday.
//    ystart: Start year for this holiday.
//    yend: Endyear for this holiday. If this entry currentry is avaiable, set this with null.
//    m: Month code. starting with 0 (0=Jan, ... 11=Dec).
// --------------------------------
hdayjp.Entry = function(id, ystart, yend, m) {
  this.id = id;
  this.ystart = ystart;
  this.yend = yend;
  this.m = m;
}

// --------------------------------
//  Calculates whether this entry is avaiable in specified year and month.
//  Arguments:
//    y: Year.
//    m: Month code. Starting with 0 (0=Jan, ... 11=Dec).
//  Returned value:
//    Whether this entry is available in specified year and month.
// --------------------------------
hdayjp.Entry.prototype.hit = function(y, m) {
  return m == this.m && (
      (this.ystart == null || y >= this.ystart) &&
      (this.yend == null || y <= this.yend)
    );
}

// --------------------------------
//  Calculates the Day of month when this entry affects.
//  Arguments:
//    y: Year.
//    m: Month code. Starting with 0 (0=Jan, ... 11=Dec).
//  Returned value:
//    Always returns null.
// --------------------------------
hdayjp.Entry.prototype.calc = function(y, m) {
  return null;
}

// ================================================
//  FixedEntry Class
//    Entry for fixed day of month.
// ================================================
// --------------------------------
//  Constructor.
//  Arguments:
//    id: id (2 or 3 characters) indicating each holiday.
//    ystart: Start year for this holiday.
//    yend: Endyear for this holiday. If this entry currentry is avaiable, set this with null.
//    m: Month code. starting with 0 (0=Jan, ... 11=Dec).
//    md: Day of month.
// --------------------------------
hdayjp.FixedEntry = function(id, ystart, yend, m, md) {
  hdayjp.Entry.call(this, id, ystart, yend, m);
  this.md = md;
}

hdayjp.FixedEntry.prototype = new hdayjp.Entry();

// --------------------------------
//  Calculates the Day of month when this entry affects.
//  Arguments:
//    y: Year.
//    m: Month code. Starting with 0 (0=Jan, ... 11=Dec).
//  Returned value:
//    The day of month.
// --------------------------------
hdayjp.FixedEntry.prototype.calc = function(y, m) {
  var id = this["id"];
  return new hdayjp.Result(id, this["md"]);
}

// ================================================
//  WdayEntry Class
//    Entry for fixed day of month.
// ================================================
// --------------------------------
//  Constructor.
//  Arguments:
//    id: id (2 or 3 characters) indicating each holiday.
//    ystart: Start year for this holiday.
//    yend: Endyear for this holiday. If this entry currentry is avaiable, set this with null.
//    m: Month code. starting with 0 (0=Jan, ... 11=Dec).
//    week: Week
//    wday: Weekday. Starting with 0 (0=Sun, ... 6=Sat).
// --------------------------------
hdayjp.WdayEntry = function(id, ystart, yend, m, week, wday) {
  hdayjp.Entry.call(this, id, ystart, yend, m);
  this.week = week;
  this.wday = wday;
}

hdayjp.WdayEntry.prototype = new hdayjp.Entry();

// --------------------------------
//  Calculates the Day of month when this entry affects.
//  Arguments:
//    y: Year.
//    m: Month code. Starting with 0 (0=Jan, ... 11=Dec).
//  Returned value:
//    The day of month.
// --------------------------------
hdayjp.WdayEntry.prototype.calc = function(y, m) {
  var id = this["id"];
  var fwd = hdayjp.calcFirstWday(y, m);
  var d = this["week"] * 7 + (7 + this["wday"] - fwd) % 7 - 6;
  return new hdayjp.Result(id, d);
}

// ================================================
//  VernalEquinoxEntry Class
//    Entry for vernal equinox (unfixed mday on March)
// ================================================
// --------------------------------
//  Constructor.
//  Arguments:
//    ystart: Start year for this holiday.
//    yend: Endyear for this holiday. If this entry currentry is avaiable, set this with null.
// --------------------------------
hdayjp.VernalEquinoxEntry = function(ystart, yend) {
  hdayjp.Entry.call(this, "VED", ystart, yend, 2);
};
hdayjp.VernalEquinoxEntry.prototype = new hdayjp.Entry();

// --------------------------------
//  Calculates the Day of month when this entry affects.
//  Arguments:
//    y: Year.
//    m: Month code. Starting with 0 (0=Jan, ... 11=Dec).
//  Returned value:
//    The day of month.
// --------------------------------
hdayjp.VernalEquinoxEntry.prototype.calc = function(y, m) {
  var id = this["id"];
  var d;
  if( y < 1980 ) {
    // http://www.asahi-net.or.jp/~ci5m-nmr/misc/equinox.html
    // 20 - 1960, 1964, 1968, 1972, 1976
    // 21 - others
    d = (y >= 1960 && y % 4 == 0) ? 20 : 21;
  }
  else {
    // http://oshiete.goo.ne.jp/qa/1454974.html
    d = parseInt(20.8431 + 0.242194 * ( y - 1980)) - parseInt((y - 1980)/4);
  }
  return new hdayjp.Result(id, d);
}

// ================================================
//  AutumnEquinoxEntry Class
//    Entry for autumn equinox (unfixed mday on September)
// ================================================
// --------------------------------
//  Constructor.
//  Arguments:
//    ystart: Start year for this holiday.
//    yend: Endyear for this holiday. If this entry currentry is avaiable, set this with null.
// --------------------------------
hdayjp.AutumnEquinoxEntry = function(ystart, yend) {
  hdayjp.Entry.call(this, "AED", ystart, yend, 8);
};
hdayjp.AutumnEquinoxEntry.prototype = new hdayjp.Entry();

// --------------------------------
//  Calculates the Day of month when this entry affects.
//  Arguments:
//    y: Year.
//    m: Month code. Starting with 0 (0=Jan, ... 11=Dec).
//  Returned value:
//    The day of month.
// --------------------------------
hdayjp.AutumnEquinoxEntry.prototype.calc = function(y, m) {
  var id = this["id"];
  var d;
  // 2014-12-10 - 1948-1980 added. (issue #2)
  if( y < 1980 ) {
    // http://www.asahi-net.or.jp/~ci5m-nmr/misc/equinox.html
    // 24 - 1951, 1955, 1959, 1963, 1967, 1971, 1975, 1979
    // 23 - others
    d = (y-3) % 4 == 0 ? 24 : 23;
  }
  else {
    // http://oshiete.goo.ne.jp/qa/1454974.html
    d = parseInt(23.2488 + 0.242194 * ( y - 1980)) - parseInt((y - 1980)/ 4);
  }

  return new hdayjp.Result(id, d);
}

// ================================================
// All entries
// ================================================
hdayjp.entries = [
  // Added on 2018-11-13.
  // Last updated on 2018-12-11 (Enthorement)
  // special holidays
  new hdayjp.FixedEntry("1959-04-10",1959,1959,  3, 10),
  new hdayjp.FixedEntry("1989-02-24",1989,1989,  1, 24),
  new hdayjp.FixedEntry("ENTHRN_CER",1990,1990, 10, 12),
  new hdayjp.FixedEntry("1993-06-09",1993,1993,  5,  9),
  new hdayjp.FixedEntry("ENTHRN_DAY",2019,2019,  4,  1),
  new hdayjp.FixedEntry("ENTHRN_CER",2019,2019,  9, 22),
  // 1948 (July-)
  // 2014-12-10 - syear of NYD,CAD,(Vernal),EBD,CTD,CDD are changed (1948 to 1949)
  // (issue #2)
  new hdayjp.FixedEntry("NYD",1949,null, 0, 1), // 元日
  new hdayjp.FixedEntry("CAD",1949,1999, 0, 15), // 成人の日(1月15日)
  new hdayjp.VernalEquinoxEntry(1949,null), // 春分
  new hdayjp.FixedEntry("EBD",1949,1988, 3, 29), // 天皇誕生日(4月29日) -1988
  new hdayjp.FixedEntry("CTD",1949,null, 4, 3), // 憲法記念日(5月3日)
  new hdayjp.FixedEntry("CDD",1949,null, 4, 5), // こどもの日(5月5日)
  new hdayjp.AutumnEquinoxEntry(1948,null), // 秋分
  new hdayjp.FixedEntry("CLD",1948,null, 10, 3), // 文化の日(11月3日)
  new hdayjp.FixedEntry("LTD",1948,null, 10, 23), // 勤労感謝の日(11月23日)
  // 1966
  new hdayjp.FixedEntry("NFD",1966,null, 1, 11), // 建国記念の日(2月11日)
  new hdayjp.FixedEntry("RAD",1966,2002, 8, 15), // 敬老の日(9月15日) - 2002
  new hdayjp.FixedEntry("HSD",1966,1999, 9, 10), // 体育の日(9月15日) - 1999
  // 1989
  new hdayjp.FixedEntry("GRD",1989,2006, 3, 29), // みどりの日(4月29日) - 2006
  new hdayjp.FixedEntry("EBD",1989,null, 11, 23), // 天皇誕生日(12月23日)
  // 1996
  new hdayjp.FixedEntry("MRD",1996,2002, 6, 20), // 海の日(7月20日) - 2002
  // 2000
  new hdayjp.WdayEntry("CAD",2000,null, 0, 2, 1), // 成人の日(1月第2月曜)
  new hdayjp.WdayEntry("HSD",2000,2019, 9, 2, 1), // 体育の日(10月第2月曜) - 2019
  // 2003
  new hdayjp.WdayEntry("MRD",2003,null, 6, 3, 1), // 海の日(7月第3月曜)
  new hdayjp.WdayEntry("RAD",2003,null, 8, 3, 1), // 敬老の日(9月第3月曜)
  // 2007
  new hdayjp.FixedEntry("SWD",2007,null, 3, 29), // 昭和の日(4月29日)
  new hdayjp.FixedEntry("GRD",2007,null, 4, 4), // みどりの日(5月4日)
  // 2016
  new hdayjp.FixedEntry("MTD",2016,null, 7, 11), // 山の日(8月11日)
  // 2020 (Added: 2018-06-13)
  new hdayjp.WdayEntry("SPD",2020,null, 9, 2, 1), // スポーツの日(10月第2月曜)
  null
];

// ================================================
// all irregular hdays
// Added: 2018-06-13
// ================================================
hdayjp._ihds = [
  new hdayjp.irregularHDays(
    2020,
    [
      {
        "id": "MRD",
        "to": [6, 23]
      },
      {
        "id": "SPD",
        "to": [6, 24]
      },
      {
        "id": "MTD",
        "to": [7, 10]
      }
    ]
  )
];


// ================================================
// Count of mday (day of month) for each month.
// ================================================
hdayjp._mdays = [31,28,31,30,31,30,31,31,30,31,30,31];

// ================================================
//  Calculates MJD.
//  Arguments:
//    y: Year.
//    m: Month code. Starting with 0 (0=Jan, ... 11=Dec).
//    d: Day of month. Starting with 1.
//  Returned value:
//    Day of week code. Starting with 0 (0=Sun, ... 6=Sat).
// ================================================
hdayjp.calcMJD = function(y, m, d) {
  if( m <= 1 ) {
    y--;
    m += 12;
  }
  return Math.floor(365.25*y) + Math.floor(y/400) - Math.floor(y/100) + Math.floor(30.59*(m-1)) + d - 678912;
}

// ================================================
//  Calculates Week of day code on 1st day in specified year and month.
//  Arguments:
//    y: Year.
//    m: Month code. Starting with 0 (0=Jan, ... 11=Dec).
//  Returned value:
//    Week of day code. Starting with 0 (0=Sun, ... 6=Sat).
// ================================================
hdayjp.calcFirstWday = function(y, m) {
  var mjd = hdayjp.calcMJD(y, m, 1);
  return (mjd + 3) % 7;
}

// ================================================
//  Calculates Days in specified year and month.
//  Arguments:
//    y: Year.
//    m: Month code. Starting with 0 (0=Jan, ... 11=Dec).
//  Returned value:
//    Days.
// ================================================
hdayjp.calcMdays = function(y, m) {
  if( m == 1 && (y % 4) == 0 && ( (y % 100) != 0 || (y % 400) == 0 ) ) {
    return 29;
  }
  return hdayjp._mdays[m];
}

// ================================================
//  Calculates holidayes in specified year and month,
//    excepting National Holiday,
//    without checking whether y and m are valid.
//  This should be called only by hdayjp.calculate().
//  Arguments:
//    y: Year. Must not be less than 1948.
//    m: Month code. Starting with 0 (0=Jan, ... 11=Dec).
//    ny: True/false value indicating whether returned value contains New Year's Holiday.
//  Returned value:
//    mdaytable: holidays for each mday [1...mdays], if mday is not holiday, undefined.
//    fw: First WDay (starting with 0=Sunday)
//    mdays: Mdays of the month.
//    Array of hdayjp.Result.
//    Returns null if y is less than 1948 or m is less than 0 or m is more than 11.
//  2018-11-14: Created.
// ================================================
hdayjp.calcMonthRaw = function(y, m) {
  var mdaytable = [];
  var fw = hdayjp.calcFirstWday(y, m);
  var mdays = hdayjp.calcMdays(y, m);
  // Added: 2018-06-13
  var ihd = hdayjp.calcIrregularHdays(y);
  // Added: 2018-06-13, adds irregulars
  if( ihd != null ) {
    ihd.calcTo(m, mdaytable);
  }
  // Entried Holidays
  for(var n = 0; n < hdayjp.entries.length; n++ ) {
    var e = hdayjp.entries[n];
    if( e != null && e.hit(y, m) ) {
      var r = e.calc(y, m);
      if( r != null ) {
        // Added: 2018-06-13, whether removed ?
        if( ihd == null || !ihd.calcHit(r.id) ) {
          // not removed. registers.
          mdaytable[r.md] = r;
        }
      }
    }
  }
  // Holiday in lieu (HL) 1973/4(/12)-
  if( y > 1973 || (y = 1973 && m>=3) ) {
    // Fixed: initial value of d was [8-2] (correct: [1,7-2])
    for( var d = (7 - fw) % 7 + 1; d <= mdays; d+= 7 ) {
      if( mdaytable[d] != null ) {
        var hit = false;
        for( var d1 = d + 1; !hit && d1 <= mdays; d1++ ) {
          if( mdaytable[d1] == null && (d1+fw-1)%7 != 0 ) {
            mdaytable[d1] = new hdayjp.Result("HL", d1);
            hit = true;
          }
        }
      }
    }
  }
  return {
    "mdaytable": mdaytable,
    "fw": fw,
    "mdays": mdays
  };
};

// ================================================
//  Calculates holidayes in specified year and month.
//  Arguments:
//    y: Year.
//    m: Month code. Starting with 0 (0=Jan, ... 11=Dec).
//    ny: True/false value indicating whether returned value contains New Year's Holiday.
//  Returned value:
//    Array of hdayjp.Result.
//    Returns null if y is less than 1948 or m is less than 0 or m is more than 11.
// ================================================
hdayjp.calculate = function(y, m, ny) {
  if( !(y >= 1948 && m >= 0 && m <=11) ) {
    return null;
  }

  // 2018-11-14: modified. bring following part out to hdayjp.calcMonthRaw().
  var mon = hdayjp.calcMonthRaw(y, m);
  var monm = m > 0 ? hdayjp.calcMonthRaw(y, m-1) : hdayjp.calcMonthRaw(y-1, 11);
  var monp = m < 11 ? hdayjp.calcMonthRaw(y, m+1) : hdayjp.calcMonthRaw(y+1, 0);

  var mdaytable = mon.mdaytable;

  var fw = hdayjp.calcFirstWday(y, m);
  var mdays = hdayjp.calcMdays(y, m);

  // National Holiday (NH) 1986-
  if( y >= 1986 ) {
    var st = 0;
    mdaytable[0] = monm.mdaytable[monm.mdays];
    mdaytable[mon.mdays+1] = monp.mdaytable[1];
    // d+1=2,...
    for( var d = 1; d <= mdays; d++ ) {
      if( mdaytable[d-1] != null && mdaytable[d-1].id != "HL" &&
          mdaytable[d] == null &&
          mdaytable[d+1] != null && mdaytable[d+1].id != "HL" &&
          (d+fw-1) % 7 ) {
        mdaytable[d] = new hdayjp.Result("NH", d);
        d = d + 1;
      }
    }
  }
  // New Years Holiday (NY)
  if( ny == true ) {
    if( m == 0 ) {
      for( var d = 1; d <= 3; d++ ) {
        if( (d + fw - 1) % 7 != 0 && mdaytable[d] == null ) {
          mdaytable[d] = new hdayjp.Result("NY", d);
        }
      }
    }
    else if( m == 11 ) {
      for( var d = 29; d <= 31; d++ ) {
        if( (d + fw - 1) % 7 != 0 && mdaytable[d] == null ) {
          mdaytable[d] = new hdayjp.Result("NY", d);
        }
      }
    }
  }
  // Extracts only holidays.
  var ret = [];
  for( var d = 1; d <= mdays; d++ ) {
    if( mdaytable[d] != null ) {
      ret.push(mdaytable[d]);
    }
  }
  return ret;
}
