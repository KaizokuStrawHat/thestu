import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

  
export default function MerchHeader({NavigationValue}){
    const titles = ['HOT PICKS', 'HOODIE', 'JACKET', 'SWEATER', 'SHIRT', 'POLO SHIRT', 'PANTS']
    return(
        <>
            <h1 className="text-center text-3xl p-10">{titles[NavigationValue]}</h1>
        </>
    )
}
