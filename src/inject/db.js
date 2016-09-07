var lib = new localStorageDB("localLibrary", localStorage);

function getLastId() {
  var count = 0;
  lib.queryAll("contents", {
    query: function(row){
      count += 1;
    }
  }) ;
  if(count == 0){
    return 0;
  }
  var result = lib.queryAll("contents", {
    limit: 1,
    sort: [["id", "ASC"]]
  });
  return result[0].id
}

function insert(data) {
  // Check if the database was just created. Useful for initial database setup
  if( lib.isNew() ) {
      lib.createTable("contents", ["id","author_name", "content", "created_at", "url"]);
      lib.commit();
    }
    data['id'] = getLastId() + 1;
    lib.insert("contents", data)
    lib.commit();
}
