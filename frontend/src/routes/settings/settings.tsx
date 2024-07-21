import Card from "../../components/card/Card"
import { t } from "i18next"
import PrimaryDropdown from "../../components/dropdown/PrimaryDropdown"
import PrimarySwitch from "../../components/switch/PrimarySwitch"
import { useState } from "react"
import SelectDropdown from "../../components/dropdown/SelectDropdown"

export const Settings = () => {
    const [enabled, setEnabled] = useState(false)
    const [selected, setSelected] = useState({ id: 1, value: 'Tom Cook' })
    return (
        <div className="w-2/3 mt-8 mx-auto">
            <Card
                title={t('generalSettings')}
            >
                <div className="px-2">
                    <h2>{t('changeDisplayLanguage')}</h2>
                    <div className="mt-2 mx-2">
                        <p>{t('changeDisplayLanguageInfo')}</p>
                    </div>
                    <div className="mt-2 mx-2">
                        <PrimarySwitch enabled={enabled} onChange={setEnabled}/>
                        <SelectDropdown title="Título select" items={[
                            { id: 1, value: 'Tom Cook' },
                            { id: 2, value: 'Wade Cooper' },
                            { id: 3, value: 'Tanya Fox' },
                            { id: 4, value: 'Arlene Mccoy' },
                            { id: 5, value: 'Devon Webb' },
                            ]}
                            selected={selected}
                            onChange={setSelected}
                        />
                    </div>
                    <p>
                        Persona seleccionada: {selected.value}
                    </p>
                </div>
            </Card>
        </div>
    )
}