import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ColapsableProps {
    isOpen: boolean;
    onToggle: () => void;
    visibleContent: React.ReactNode;
    children: React.ReactNode;
}

export const Colapsable = (props: ColapsableProps) => {

    const { isOpen, onToggle, visibleContent, children } = props

    return (
        <>
            <div onClick={onToggle} className="flex cursor-pointer flex-row items-center justify-between">
                {visibleContent}
                <button className="p-2">
                    <FontAwesomeIcon icon={faChevronDown} className={`${isOpen ? 'rotate-180' : ''} text-neutral-400 transition-transform duration-300`} />
                </button>
            </div>
            <div style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.2s linear' }} className="grid">

                <div className="overflow-hidden">
                    {children}
                </div>
            </div>
        </>
    )
}
