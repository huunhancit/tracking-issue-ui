import { find } from 'common/func.utils'
import { showError } from 'common/notify.utils'
import { useState } from 'react'
import { getVersion, storeVersion } from 'services/storage.service'
import { getVersions } from 'services/version.service'

const VersionContext = () => {
  const [isShowVersionModal, setIsShowVersionModal] = useState(false)
  const [versions, setVersions] = useState([])
  const [version, setVersion] = useState(null)

  const onSelectVersion = (formData) => {
    setIsShowVersionModal(false)
    const ver = find(versions, (it) => it.id === formData.version)
    storeVersion(ver)
    setVersion(ver)
  }

  const showVersionModal = () => {
    const ver = getVersion()
    if (ver) {
      setVersion(ver)
    } else {
      setIsShowVersionModal(true)
      getVersions()
        .then((res) => {
          setVersions(res)
        })
        .catch(showError)
    }
  }

  return {
    setIsShowVersionModal,
    isShowVersionModal,
    version,
    versions,
    onSelectVersion,
    showVersionModal
  }
}

export default VersionContext
