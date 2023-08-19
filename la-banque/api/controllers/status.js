'use strict';

module.exports = {
  status: status
};

function status(req, res) {
  const hello = 'The server is running';

  res.json(hello);
}
