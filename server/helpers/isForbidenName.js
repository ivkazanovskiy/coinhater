function isForbidenName(name) {
  const trimmedName = name.replace(/\s/g, '');
  const nameCheck = /^.*[мМm]+[оОo0]+[нНnh]+[еЕe]+[тТt]+[оОo0]+([чЧ4]|ch)+[кКk]+[аАa@]+.*$/i.test(trimmedName);
  return nameCheck;
}

module.exports = isForbidenName;
