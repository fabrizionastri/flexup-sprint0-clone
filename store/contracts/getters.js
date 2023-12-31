export default {
  all(state) {
    if (!state.items) return []
    const res = JSON.parse(JSON.stringify(state.items))
    return res
  },
  types(state) {
    if (!state.typeContrat) return []
    const res = JSON.parse(JSON.stringify(state.typeContrat))
    return res
  },
  getTypes: (state) => (idAccount) => {
    const id = parseInt(idAccount)
    if (!state.items) return []
    console.log('id :', id)
    const res = JSON.parse(JSON.stringify(state.typeContrat))
    return res
  },
  legalStructures(state) {
    const res = JSON.parse(JSON.stringify(state.legalStructures))
    return res
  },
  getLegalStructureById: (state) => (legalStructureId) => {
    if (!state.legalStructures) return null
    const id = parseInt(legalStructureId)
    const res = state.legalStructures.find((v) => parseInt(v.id) === id)
    return res
  },
}
