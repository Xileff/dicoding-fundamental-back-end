// Method accepts an object, destructures it, then maps it to a new object which will be returned
const mapDBToModel = ({
  id,
  title,
  body,
  tags,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  body,
  tags,
  createdAt: created_at,
  updatedAt: updated_at,
});

module.exports = { mapDBToModel };