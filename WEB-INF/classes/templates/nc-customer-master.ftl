<#-- 
 * APSCV
 * Copyright (c) 2007 Ayala Systems Technology Inc.
 * $Revision: 5315 $
 * $Id: $
 * $Author: rmp $
 *    
 * $LastChangedBy: $
 * $LastChangedDate: $
 * 
 -->
<?xml version="1.0" encoding="UTF-8"?>
<customer memberNumber="${memberNumber}">
  <#assign dbQuote='"'>
  <#assign sgQuote="'">
  <#assign ampher="&">
  <#assign lsThan="<">
  <#assign gtThan=">">
<#list memberList as MemberMap>
      <fields <#assign fieldNames=MemberMap?keys>
      <#list fieldNames as fieldName>
      <#assign fldVal=MemberMap[fieldName]?string>
      <#--
      <#if fldVal?contains(sgQuote)>
          <#assign fldVal=fldVal?replace(sgQuote,"&apos;")>
      </#if>
      <#if fldVal?contains(dbQuote)>
          <#assign fldVal=fldVal?replace(dbQuote,"&quot;")>
      </#if>
      -->
      <#if fldVal?contains(ampher)>
          <#assign fldVal=fldVal?replace(ampher,"&amp;")>
      </#if>
      <#if fldVal?contains(lsThan)>
          <#assign fldVal=fldVal?replace(lsThan,"&lt;")>
      </#if>
      <#if fldVal?contains(gtThan)>
          <#assign fldVal=fldVal?replace(gtThan,"&gt;")>
      </#if>
	  ${fieldName}='${fldVal}'
      </#list>/>
</#list>
</customer>